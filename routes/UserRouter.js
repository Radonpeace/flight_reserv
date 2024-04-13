import { Router } from "express";

// import { check, validationResult } from "express-validator";

import {signup,login,forgotPassword,resetPassword} from "../controllers/UserController.js";
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/forgotPassword',(req,res)=>{
    res.render('forgotPassword');
})

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword',resetPassword);



export default router;