import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {authAdmin, authUser} from './middleware/auth.js';
import UserRouter from './routes/UserRouter.js';
import TripRouter from './routes/TripRouter.js';

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

console.log(process.env.JWT_SECRET)
// Connect to MongoDB
mongoose.connect(mongoDBUri).then(() => {
    console.log('MongoDB Connected');
}).catch((error) => {
    console.log(error);
});


app.get('/', async (req, res) => {
    const isLoggedIn = true;
    console.log(req.userId);
    res.render('index',{isLoggedIn});
});

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
