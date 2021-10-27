import * as cartCtrl from '../controllers/cart.controller'
import express=require('express');

const cartRouter:express.Router=express.Router();

cartRouter.get('/cart',cartCtrl.getCart);
cartRouter.post('/cart/',cartCtrl.addProductToCart);
cartRouter.put('/cart/',cartCtrl.updateProductInCart);
cartRouter.delete('/cart/product/',cartCtrl.deleteProductFromCart);
cartRouter.delete('/cart/',cartCtrl.deleteCart);

export default cartRouter;