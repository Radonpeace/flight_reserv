import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded && decoded.user){
            req.userId = decoded.user.id;
        }
        else{
            return res.status(401).json({msg: 'Token is not valid'});
        }
        next(); //? Call next middleware
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' }); //? sending json response with message
    }
}

function authAdmin(req,res,next){
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded && decoded.user && decoded.user.role === 'admin'){
            req.userId = decoded.user.id;
        }
        else{
            return res.status(401).json({msg: 'Token is not valid'});
        }
        next(); //? Call next middleware
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' }); //? sending json response with message
    }
}

export {authUser, authAdmin};


    