import { db } from "../config/dbConection";
import { Response, Request } from 'express';

export function getCart(req: Request, res: Response) {
    try {
        let results = db.getData("/products");

        results.sort((firstProduct: any, secondProduct: any) => {
            return new Date(secondProduct.releaseDate).getTime() - new Date(firstProduct.releaseDate).getTime();
        })
        if (results.length == 0) {
            return res.status(200).json({
                message: "There isn´t any sneaker"
            })
        }
        else {

            return res.status(200).json({
                message: "return products",
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
    try {
        let results = db.getData("/products");

        results.sort((firstProduct: any, secondProduct: any) => {
            return new Date(secondProduct.releaseDate).getTime() - new Date(firstProduct.releaseDate).getTime();
        })
        if (results.length == 0) {
            return res.status(200).json({
                message: "There isn´t any sneaker"
            })
        }
        else {

            return res.status(200).json({
                message: "return products",
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

export function updateProductInCart(req: Request, res: Response) {
    try {
        let results = db.getData("/products");

        results.sort((firstProduct: any, secondProduct: any) => {
            return new Date(secondProduct.releaseDate).getTime() - new Date(firstProduct.releaseDate).getTime();
        })
        if (results.length == 0) {
            return res.status(200).json({
                message: "There isn´t any sneaker"
            })
        }
        else {

            return res.status(200).json({
                message: "return products",
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

export function deleteProductFromCart(req: Request, res: Response) {
    try {
        let results = db.getData("/products");

        results.sort((firstProduct: any, secondProduct: any) => {
            return new Date(secondProduct.releaseDate).getTime() - new Date(firstProduct.releaseDate).getTime();
        })
        if (results.length == 0) {
            return res.status(200).json({
                message: "There isn´t any sneaker"
            })
        }
        else {

            return res.status(200).json({
                message: "return products",
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