import { Router } from "express";
import  Trip  from "../models/Trip.js"
import Ticket from "../models/Ticket.js"


const insertAll = async (req,res) =>{
    await Trip.insertMany(tripDetails);
    res.send('Inserted all trip details');
}

const getDetails = async (req,res) =>{
    const {from: From, departure: Departure, fromDate: FromDate, toDate: ToDate} = req.query; 
    console.log(From, Departure, FromDate, ToDate);
    const trips = await Trip.find({from: From, to: Departure});
    const actualTrips = trips.filter(trip => {
        return trip.arrivalTime >= FromDate && trip.departureTime <= ToDate;
    });
    console.log(actualTrips);
    res.render('flight',{trips: trips});

}

    
// {passengers: {economy: 2, business: 1}, tripId: '60b1d7c1f1b4f1a5d4c0e4a5'
const bookTicket = async (req,res) =>{
    const {passengers, tripId} = req.body;
    const {economy , business} = passengers;
    try{
        const trip = await Trip.findById(tripId);
        if(trip === null){
            return res.status(400).json({msg: 'Trip not found'});
        }
        
        trip.book(passengers);
        const ticket = new Ticket({
            trip: tripId,
            user: req.user.id,
            passengers: passengers,
            totalPrice: (economy * trip.price.economy) + (business * trip.price.business),
        });
        await ticket.save();
        // trip.booked.economy += passengers.economy;
        // trip.booked.business += passengers.business;
        // await trip.save();
        
        res.json({msg: 'Ticket booked successfully'});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}

const getTickets = async (req,res) =>{
    try{
        const tickets = await Ticket.find({user: req.user.id}).populate('trip');
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
export {insertAll,getDetails,bookTicket,getTickets,getTicket,cancelTicket}