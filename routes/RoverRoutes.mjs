
import express from 'express';
import { addOrUpdateRovers, getAllRovers } from '../Controllers/RoverController.mjs';

const RoverRoutes = express.Router();

RoverRoutes.post('/rovers', addOrUpdateRovers);
RoverRoutes.get('/rovers', getAllRovers);

export default RoverRoutes;
