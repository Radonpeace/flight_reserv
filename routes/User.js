import { Mongoose } from "mongoose";
import { connectDB } from "./db";
import User from "../models/User"
import Seat from "../models/Seat";
import Ticket from "./models/Ticket";
import Trip from "./models/Trip";
import { Router } from "express";
import { json } from "body-parser";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = Router();
router.use(json());

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/signup',async (req,res)=>{
    const {name,email,password,phone} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({name,email,password,phone});
        await user.save(); //* Save user to database
        return res.status(200).json({msg: 'User created successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        if(!user.comparePassword(password)){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        const payload = {
            user:{
                id: user.id
            }
        };
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: 360000},(error,token)=>{
            if(error) throw error;
            res.json({token});
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/profile',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

export default router;