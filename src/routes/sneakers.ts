import * as sneakersCtrl from '../controllers/sneakers.controller'
import express=require('express');

const sneakersRouter:express.Router=express.Router();

sneakersRouter.get('/products',sneakersCtrl.getSneakers);
sneakersRouter.get('/products/:id',sneakersCtrl.getSneaker);

export default sneakersRouter;