import { Directions } from '../controllers/directions.controller'
import express=require('express');

const directionsCtrl = new Directions();

const directionsRouter:express.Router=express.Router();

directionsRouter.get('/getCities',directionsCtrl.getCities);
directionsRouter.get('/getClient/:identification_card',directionsCtrl.getClient);
directionsRouter.get('/getClients',directionsCtrl.getClients);
directionsRouter.post('/createClient',directionsCtrl.createClient);
directionsRouter.post('/createClientDirection',directionsCtrl.createClientDirection);
directionsRouter.get('/getClientDirections/:identification_card',directionsCtrl.getClientDirections);
directionsRouter.put('/updateClientDirection',directionsCtrl.updateClientDirection);

export default directionsRouter;