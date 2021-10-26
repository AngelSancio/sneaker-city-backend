import { db } from "../config/dbConection";
import { Response, Request } from 'express';

export function getCart(req: Request, res: Response) {
    try {
        let results = db.getData("/cart");
        if (results.length == 0) {
            return res.status(200).json({
                message: "There isn´t any sneaker"
            })
        }
        else {

            return res.status(200).json({
                message: "return cart",
                result: results
            })
        }
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
        let product = db.getIndex("/products", data.productId, "id");
        let results: any;

        if (product !== -1) {
            db.push("/cart[]", data);
            results = db.getData("/cart");
        } else {
            throw "The product doesn´t exist";
        }
        
        return res.status(200).json({
            message:"Product added to cart",
            result: results
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message:"An error ocurred",
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
            message:"An error ocurred",
            error: error
        })   
    }
}

export function deleteProductFromCart(req: Request, res: Response) {
    const data = req.body;
    let message = "The product you try to delete is not in the car"
    let results: any;
    console.log(data)

    try {

        const index = db.getIndex("/cart", data.productId, "productId");

        if (index !== -1) {
            db.delete(`/cart[${index}]`);
            results = db.getData("/cart");
            message = "Product on cart deleted";
        } else {
            throw message
        }

        return res.status(200).json({
            message: message,
            result: index
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message:"An error ocurred",
            error: error
        })   
    }
}