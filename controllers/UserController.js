import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



const signup = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password, phone });
        await user.save();
        return res.status(200).json({ status:'success' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user === null){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        if(!user.comparePassword(password)){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const payload = {
            user:{
                id: user._id,
                role: user.role
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: 360000},(error,token)=>{
            if(error) throw error;
            res.json({status:"success" , token: token});
        }); //! token expires in 10 minutes
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

const forgotPassword = async (req,res) =>{
    //? Send email to user with a link to reset password
}

export {signup,login,forgotPassword};