import { Model,Schema } from "mongoose";

const SeatSchema = new Schema({
    seatNumber: {
        type: String,
        required: true
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    class: {
        type: String,
        enum: ['economy', 'business'],
        default: 'economy'
    },
    status: {
        type: String,
        enum: ['booked', 'available'],
        default: 'available'
    },
    price:{
        type: Number,
        required: true
    }
});

SeatSchema.methods.book = function(){
    this.status = 'booked';
}

SeatSchema.methods.cancel = function(){
    this.status = 'available';
}

const Seat = Model('Seat', SeatSchema);

module.exports = Seat;