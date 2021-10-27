import { db } from "../config/dbConection";
import { Response, Request } from 'express';

export function getCart(req: Request, res: Response) {
    let message = "Cart obtained"
    try {
        let results = db.getData("/cart");
        if (results.length == 0) {
            message = "The cart is empty"
        }

        return res.status(200).json({
            message: message,
            result: results
        })
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            mensaje: "Ha ocurrido un error",
            status: 400,
            error: error
        })
    }
}

export function addProductToCart(req: Request, res: Response) {
    const data = req.body;

    try {
        const product = db.getIndex("/products", data.productId, "id");
        const index = db.getIndex("/cart", data.productId, "productId");
        let results: any;


        if (product !== -1) {
            if (index !== -1) {
                db.push(`/cart[${index}]`, data)
            } else {
                db.push("/cart[]", data);
            }
            results = db.getData("/cart");
        } else {
            throw "The product doesn´t exist";
        }

        return res.status(200).json({
            message: "Product added to cart",
            result: results
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "An error ocurred",
            error: error
        })
    }
}

export function updateProductInCart(req: Request, res: Response) {
    const data = req.body;
    let message = "The product you try to modify is not in the car"
    let results: any;

    try {

        const index = db.getIndex("/cart", data.productId, "productId");

        if (index !== -1) {
            db.push(`/cart[${index}]`, data);
            results = db.getData("/cart");
            message = "Product on cart updated"
        } else {
            throw message
        }

        return res.status(200).json({
            message: message,
            result: results
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "An error ocurred",
            error: error
        })
    }
}

export function deleteProductFromCart(req: Request, res: Response) {
    const data = req.body;
    let message = "The product you try to remove is not in the car"
    let results: any;

    try {

        const index = db.getIndex("/cart", data.productId, "productId");

        if (index !== -1) {
            db.delete(`/cart[${index}]`);
            results = db.getData("/cart");
            message = "Product on cart removed";
        } else {
            throw message
        }

        return res.status(200).json({
            message: message,
            result: results
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "An error ocurred",
            error: error
        })
    }
}

export function deleteCart(req: Request, res: Response) {

    try {

        db.push(`/cart`, []);
        let results = db.getData("/cart");

        return res.status(200).json({
            message: "Cart checked out!",
            result: results
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "An error ocurred",
            error: error
        })
    }
}