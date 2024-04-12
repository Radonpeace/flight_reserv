import { Router } from "express";

import {insertAll,getFlightsDetails,getFlightDetail} from "../controllers/TripController.js";

const router = Router();

router.get('/insert', insertAll);

router.get('/details', getFlightsDetails);

router.get('/details/:fid', getFlightDetail);


export default router;