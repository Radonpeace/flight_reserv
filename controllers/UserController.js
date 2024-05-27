import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
        return res.status(500).json({ msg: 'Server Error' });
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
            return res.status(500).json({msg: 'Invalid Credentials'});
        }
        const payload = {
            user:{
                id: user._id,
                role: user.role
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,(error,token)=>{
            const cookieOptions = {
                expires: new Date(
                    Date.now() + 10*60* 60 * 1000
                ),
                httpOnly: true
            } //cookie will expire in 10 hours
            res.cookie('token', token, cookieOptions); //! setting cookie
            if(error) throw error;
            return res.json({status:"success" , token: token});
        }); // no need to use async await since jwt.sign is synchronous , no expiring time for now
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

const forgotPassword = async (req,res) =>{
    const {email} = req.body;
    try{
        let user = await User.findOne({email});
        if(user === null){
            return res.status(400).json({msg: 'User not found'});
        }
        const payload = {
            user:{
                id: user._id,
                role: user.role
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: 600},(error,token)=>{
            if(error) throw error;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: '96315196'
                }
            });
            alert('This service is not available at the moment')
            // const mailOptions = {
            //     from: process.env.EMAIL,
            //     to: email,
            //     subject: 'Password Reset Link',
            //     text: `Click on the link to reset your password: http://localhost:8000/resetPassword/${token}\n
            //     The link will expire in 10 minutes.`
            // }
            // transporter.sendMail(mailOptions,(error,info)=>{
            //     if(error){
            //         console.error(error.message);
            //         res.status(500).json({msg: 'Server Error'});
            //     }
            //     else{
            //         console.log('Email sent: ' + info.response);
            //         res.json({msg: 'Email sent'});
            //     }
            // });
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

const resetPassword = async (req,res) =>{
    const {token} = req.params;
    const {password} = req.body;
    try{
        jwt.verify(token,process.env.JWT_SECRET,async (error,decoded)=>{
            if(error){
                return res.status(400).json({msg: 'Token is not valid'});
            }
            let user = await User.findById(decoded.user.id);
            if(user === null){
                return res.status(400).json({msg: 'User not found'});
            }
            user.password = password;
            await user.save();
            res.json({msg: 'Password reset successfully'});
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

export {signup,login,forgotPassword,resetPassword};