import { Model,Schema } from "mongoose";    

const TicketSchema = new Schema({
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});

TicketSchema.methods.getTotalPrice = function(){
    return this.passengers * this.trip.price;
}

TicketSchema.methods.cancel = function(){
    this.status = 'cancelled';
    this.trip.cancel();
}


const Ticket = Model('Ticket', TicketSchema);

module.exports = Ticket;

