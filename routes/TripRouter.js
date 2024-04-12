import { Router } from "express";

import {insertAll,getDetails} from "../controllers/TripController.js";

const router = Router();

router.get('/insert', insertAll);

router.get('/details',getDetails);


export default router;