import { db } from "../config/dbConection";
import { Response, Request } from 'express';


export function getSneakers(req: Request, res: Response) {
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

export function getSneaker(req: Request, res: Response) {
    try {
        const params = req.params;
        let results = db.getData("/products").find((item: any) => item.id === params.id);
        if (results.length == 0) {
            return res.status(200).json({
                message: "There isn´t any sneaker"
            })
        }
        else {

            return res.status(200).json({
                message: "return a product",
                result: results
            })
        }
        // })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            mensaje: "Ha ocurrido un error",
            status: 400,
            error: error
        })
    }
}
