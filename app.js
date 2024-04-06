import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

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


// Connect to MongoDB
mongoose.connect(mongoDBUri).then(() => {
    console.log('MongoDB Connected');
}).catch((error) => {
    console.log(error);
});


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});
