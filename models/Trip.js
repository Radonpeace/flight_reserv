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
    return {
        economy: this.capacity.economy - this.booked.economy,
        business: this.capacity.business - this.booked.business
    }
}

TripSchema.methods.book = async function(seats){
    const classType = seats.classType;
    if(!['economy', 'business'].includes(classType)){
        throw new Error('Invalid class type');
    }
    if(this.isAvailableForBooking(seats)){
        this.booked[classType] += seats.count;
    }
    else{
        throw new Error('Seats not available');
    }
    await this.save();
}

TripSchema.methods.cancel = function(seats){
    const {economy, business} = seats;
    if(this.booked.economy >= economy && this.booked.business >= business){
        this.booked.economy -= economy;
        this.booked.business -= business;
    }
    else{
        throw new Error('Seats not booked');
    }
}

TripSchema.methods.isAvailableForBooking = function(seats){
    const {classType,count } = seats;
    const availableSeats = this.getAvailableSeats();
    if(classType === 'economy' && availableSeats.economy >= count){
        return true;
    }
    else if(classType === 'business' && availableSeats.business >= count){
        return true;
    }
    else{
        return false;
    }
}

TripSchema.methods.isCancelled = function(){
    return this.status === 'cancelled';
}

TripSchema.methods.calculateFair=function(seats){
    const {classType, count} = seats;
    return this.price[classType] * count;
}

const Trip = model('Trip', TripSchema);

export default Trip;