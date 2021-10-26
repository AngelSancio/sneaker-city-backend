import { db } from "../config/dbConection";
import { Response, Request } from 'express';

export class Sneakers {
    // Obtener las ciudades
    public getSneakers(req: Request, res: Response) {
        try {
            let results = db.getData("/sneakers");
            if (results.length == 0) {
                return res.status(200).json({
                    message: "There isn´t any sneaker"
                })
            }
            else {

                return res.status(200).json({
                    message: "return ",
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
}