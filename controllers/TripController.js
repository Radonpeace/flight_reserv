import { Router } from "express";
import  Trip  from "../models/Trip.js"
import Ticket from "../models/Ticket.js"
import mongoose from "mongoose";
import { tripSeedData } from "../lib/seed.js";


const insertAll = async (req,res) =>{
    await Trip.insertMany(tripSeedData);
    res.send('Inserted all trip details');
}

const getFlightsDetails = async (req,res) =>{
    const {from: From, departure: Departure, fromDate: FromDate, toDate: ToDate} = req.query; 
    const trips = await Trip.find({from: From, to: Departure});
    let fromDate = new Date(FromDate);
    let toDate = new Date(ToDate);
    const actualTrips = trips.filter(trip => {
        return trip.arrivalTime >= fromDate && trip.departureTime <= toDate;
    });
    actualTrips.forEach(trip => {
        trip.departureTime = trip.departureTime.toISOString().split('T')[0]; // toISOString() returns date in ISO format
        trip.arrivalTime = trip.arrivalTime.toISOString().split('T')[0];
    });
    actualTrips.sort((a,b) => a.departureTime - b.departureTime); // sort by departure time
    res.render('flights',{trips: actualTrips});

}

const getFlightDetail = async (req,res) => {
    const {fid} = req.params;
    if(mongoose.Types.ObjectId.isValid(fid)){
        const trip = await Trip.findById(fid);
        //console.log(trip);
        trip.departureTime = trip.departureTime.toISOString().split('T')[0];
        trip.arrivalTime = trip.arrivalTime.toISOString().split('T')[0];
        trip.available = await trip.getAvailableSeats();
        //console.log(trip);  
        res.render('flight',{flight: trip});
    }
}

    
// {passengers: {economy: 2, business: 1}, tripId: '60b1d7c1f1b4f1a5d4c0e4a5'
const bookTicket = async (req,res) =>{
    const {seats, tripId,passengers} = req.body;
    try{
        const trip = await Trip.findById(tripId);
        if(trip === null){
            return res.status(400).json({msg: 'Trip not found'});
        }
        await trip.book(seats);

        const fair = trip.calculateFair(seats);
        const ticket = new Ticket({
            trip: tripId,
            user: req.userId,
            passengersCount: seats.count,
            classType: seats.classType,
            passengers: passengers,
            totalPrice: fair,
        });
        await ticket.save();
        //console.log(ticket);
        return res.json({msg: 'Ticket booked successfully'});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}

const getTickets = async (req,res) =>{
    try{
        const tickets = await Ticket.find({user: req.userId}).populate('trip');
        tickets.forEach(ticket => {
            ticket.classType = ticket.classType.toUpperCase();
            ticket.status = ticket.status.toUpperCase();
            ticket.trip.departureTime = ticket.trip.departureTime.toISOString().split('T')[0];
            ticket.trip.arrivalTime = ticket.trip.arrivalTime.toISOString().split('T')[0];
        });
        tickets.sort((a,b) => b.bookingDate - a.bookingDate);
        res.render('tickets',{tickets: tickets});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const getTicket = async (req,res) =>{
    const {ticketId} = req.params;
    try{
        const ticket = await Ticket.findById(ticketId).populate('trip');
        res.render('ticket',{ticket: ticket});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const cancelTicket = async (req,res) =>{
    const {ticketId} = req.params;
    const {passengers} = req.body;
    try{
        const ticket = await Ticket.findById(ticketId);
        if(ticket === null){
            return res.status(400).json({msg: 'Ticket not found'});
        }
        ticket.cancel(passengers);
        await ticket.save();
        res.json({msg: 'Ticket cancelled successfully'});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
export {insertAll,getFlightsDetails,bookTicket,getTickets,getTicket,cancelTicket,getFlightDetail}