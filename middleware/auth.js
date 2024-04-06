import {jwt} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function auth(req, res, next) {
    const token = req.header('x-auth-token'); //* Get token from header (x-auth-token is the key)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded && decoded.user){
            req.user = decoded.user;
        }
        else{
            return res.status(401).json({msg: 'Token is not valid'});
        }
        next(); //? Call next middleware
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' }); //? sending json response with message
    }
}


    