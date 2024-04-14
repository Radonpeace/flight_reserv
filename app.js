import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {authAdmin, authUser} from './middleware/auth.js';
import UserRouter from './routes/UserRouter.js';
import TripRouter from './routes/TripRouter.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config(); //* load environment variables from .env file
const PORT = process.env.PORT;
const mongoDBUri = process.env.MONGODB_URI;


app.use(bodyParser.urlencoded({ extended: true })); //* parse application/x-www-form-urlencoded -> for form data
app.use(bodyParser.json()); //* parse application/json -> for json data
app.use(cors());
app.use(express.static('public')); //* serve static files from public directory
app.set('view engine', 'ejs');
app.set('views','views'); //* set views directory as views (__dirname is the current directory)
app.use(express.static('public')); //* serve static files from public directory
app.use(cookieParser());


mongoose.connect(mongoDBUri).then(() => {
    console.log('MongoDB Connected');
}).catch((error) => {
    console.log(error);
});

app.get('/contact',(req,res)=>{
    res.render('contact')
}) 

app.get('/', async (req, res) => {
    try{
        const cookies = req.headers.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
            prev[name] = value;
            return prev;
        }, {});
    }
    catch(error){
        res.redirect('/login');
        console.log('No cookies found');
    }

    const tokenCookie = req.cookies.token;
    if(tokenCookie){
        jwt.verify(tokenCookie, process.env.JWT_SECRET, (error, decoded) => {
            if(error){
                console.log('Token is not valid');
            }
            else{
                //console.log(decoded);
                req.userId = decoded.user.id;
            }
        });
    }
    // console.log(req.userId)
    let isLoggedIn = req.userId ? true : false;
    res.render('index',{isLoggedIn});
});

app.get('/logout',authUser,(req,res)=>{
    res.clearCookie('token');
    res.redirect('/login');
})

app.get('/flightDetails',(req,res)=>{
    res.render('flightDetails')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
}) 

app.use('/user', UserRouter);
app.use('/admin', UserRouter);
app.use(authUser);
app.use('/trip', TripRouter);

app.get('/userProtected', authUser, async (req, res) => {
    res.send(req.userId);
});

app.get('/adminProtected', authAdmin, async (req, res) => {
    res.send('Admin Protected Route');
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});
