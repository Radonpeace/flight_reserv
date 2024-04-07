import { Router } from "express";

// import { check, validationResult } from "express-validator";

import {signup,login,forgotPassword} from "../controllers/UserController.js";
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);


export default router;