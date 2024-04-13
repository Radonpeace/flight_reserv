import {model,Schema} from 'mongoose';

const OtpSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 3600 // expires in 1 hour
    },
});

const Otp = model('Otp', OtpSchema);

export default Otp;