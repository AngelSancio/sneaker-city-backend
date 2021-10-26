import * as cartCtrl from '../controllers/cart.controller'
import express=require('express');

const sneakersRouter:express.Router=express.Router();

sneakersRouter.get('/cart',cartCtrl.getCart);
sneakersRouter.post('/cart',cartCtrl.addProductToCart);
sneakersRouter.delete('/cart',cartCtrl.deleteProductFromCart);

export default sneakersRouter;