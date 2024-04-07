import { model, Schema } from "mongoose";

const TripSchema = new Schema({
    flight:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    arrivalTime:{
        type: Date,
        required: true
    }, //?Arrival time of the flight at the destination
    departureTime:{
        type: Date,
        required: true
    }, //?Departure time of the flight from the source
    price:{
        economy:{
            type: Number,
            required: true
        },
        business:{
            type: Number,
            required: true
        },
    },
    capacity:{
        economy:{
            type: Number,
            required: true
        },
        business:{
            type: Number,
            required: true
        },
    },
    booked:{
        economy:{
            type: Number,
            default: 0
        },
        business:{
            type: Number,
            default: 0
        },
    },
    status:{
        type: String,
        enum: ['scheduled', 'cancelled'],
        default: 'scheduled'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


TripSchema.methods.getAvailableSeats = function(){
    return this.capacity - this.booked;
}

TripSchema.methods.book = function(seats){
    this.booked += seats;
}

TripSchema.methods.cancel = function(seats){
    if(this.booked >= seats){
        this.booked -= seats;
    }
}

TripSchema.methods.isAvailableForBooking = function(seats){
    return this.getAvailableSeats() >= seats;
}

const Trip = model('Trip', TripSchema);
module.exports = Trip; //? can be written as export default Trip; in ES6