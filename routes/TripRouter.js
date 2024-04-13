import { Router } from "express";

import {insertAll,getFlightsDetails,getFlightDetail, bookTicket,getTickets} from "../controllers/TripController.js";
import { get } from "mongoose";

const router = Router();

router.get('/insert', insertAll);

router.get('/details', getFlightsDetails);

router.post('/book',bookTicket)

router.get('/details/:fid', getFlightDetail);

router.get('/tickets', getTickets);



export default router;