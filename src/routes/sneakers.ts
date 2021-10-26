import { Sneakers } from '../controllers/sneakers.controller'
import express=require('express');

const sneakersCtrl = new Sneakers();

const sneakersRouter:express.Router=express.Router();

sneakersRouter.get('/items',sneakersCtrl.getSneakers);

export default sneakersRouter;