import {connection,withTransaction } from "../config/dbConection";
import {Response,Request} from 'express';
import { Validations } from '../utils/utils'

const connectionU=connection();
const validate = new Validations();

export class Directions {
    // Obtener las ciudades
    public async getCities(req: Request, res: Response) {
        try {
            await  withTransaction(async ()=>{
                let results=await connectionU.query(`CALL ReadAllCities();`,[]);
                if(results.length==0){
                    return res.status(200).json({
                        message:"No hay ciudades"
                    })            
                }
                else{

                    let cities: Array<String> = [];

                    for (const city of results[0]) {
                        cities.push(city.name)
                    }

                    return res.status(200).json({
                        message:"Retorna las ciudades",
                        result:cities
                    })
                }
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                status: 400,
                error: error
            }) 
        }
    }

    // Obtener los clientes
    public async getClients(req: Request, res: Response) {
        try {
            await  withTransaction(async ()=>{
                let results=await connectionU.query(`CALL ReadAllClients();`,[]);
                if(results.length==0){
                    return res.status(200).json({
                        message:"No hay ciudades"
                    })            
                }
                else{

                    let clients: Array<String> = [];

                    for (const client of results[0]) {
                        clients.push(client)
                    }

                    return res.status(200).json({
                        message:"Retorna los clientes",
                        result:clients
                    })
                }
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                status: 400,
                error: error
            }) 
        }
    }

    // Obtener un cliente
    public async getClient(req: Request, res: Response) {
        const data = req.params

        if (!validate.validateIdentificationCard(data.identification_card ? data.identification_card : "")) {
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: "La cèdula no cumple con los caracteres adecuados"
            })   
        }

        try {
            await  withTransaction(async ()=>{
                let results=await connectionU.query(`CALL ReadClient(?);`,[data.identification_card]);

                return res.status(200).json({
                    message:"Retorna el cliente",
                    result:results[0]
                })
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                status: 400,
                error: error
            }) 
        }
    }

    // Crear un cliente
    public async createClient(req: Request, res: Response) {
        const data = req.body;

        if (!validate.validatePhoneNumber(data.phone_number ? data.phone_number : "")) {
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: "El telèfono no cumple con los caracteres adecuados"
            })   
        }

        if (!validate.validateIdentificationCard(data.identification_card ? data.identification_card : "")) {
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: "La cèdula no cumple con los caracteres adecuados"
            })   
        }

        let queryDetails=`call CreateClient(?,?,?,?)`
        try {
            await withTransaction(async ()=>{
                let results=await connectionU.query(queryDetails,[data.first_name, data.last_name, data.phone_number, data.identification_card]);
                
                return res.status(200).json({
                    message:"Cliente creado",
                    result:results[0]
                })
                
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: error.sqlMessage ? error.sqlMessage : "Lo sentimos"
            })   
        }
    }

    // Guardar direccion de un cliente
    public async createClientDirection(req: Request, res: Response) {
        const data = req.body;

        if (!validate.validateIdentificationCard(data.identification_card ? data.identification_card : "")) {
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: "La cèdula no cumple con los caracteres adecuados"
            })   
        }

        let queryDetails=`call CreateClientDirection(?,?,?,?,?,?)`
        try {
            await withTransaction(async ()=>{
                let results=await connectionU.query(queryDetails,[
                                                                    data.street, 
                                                                    data.number, 
                                                                    data.floor ? data.floor : 1,
                                                                    data.residential ? data.residential : "",
                                                                    data.identification_card,
                                                                    data.city
                                                                ]);
                
                return res.status(200).json({
                    message:"Direcciòn de cliente creada",
                    result:results[0]
                })
                
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: error.sqlMessage ? error.sqlMessage : "Lo sentimos"
            })   
        }
    }

    // Obtener las direcciones de un cliente
    public async getClientDirections (req: Request, res: Response) {
        const data = req.params
        
        try {
            await  withTransaction(async ()=>{
                let results=await connectionU.query(`CALL ReadClientDirections(?);`,[data.identification_card]);
                
                return res.status(200).json({
                    message:"Retorna las direcciones",
                    result:results[0]
                })
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                status: 400,
                error: error
            }) 
        }
    }

    // Actualizar la direcciòn de un cliente
    public async updateClientDirection(req: Request, res: Response) {
        const data = req.body;

        if (!validate.validateIdentificationCard(data.identification_card ? data.identification_card : "")) {
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: "La cèdula no cumple con los caracteres adecuados"
            })   
        }

        let queryDetails=`call UpdateClientDirection(?,?,?,?,?,?,?)`
        try {
            await withTransaction(async ()=>{
                let results=await connectionU.query(queryDetails,[
                                                                    data.street, 
                                                                    data.number, 
                                                                    data.floor ? data.floor : 1,
                                                                    data.residential ? data.residential : "",
                                                                    data.identification_card,
                                                                    data.city,
                                                                    data.direction_id
                                                                ]);
                
                return res.status(200).json({
                    message:"Direcciòn de cliente actualizada",
                    result:results[0]
                })
                
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensaje:"Ha ocurrido un error",
                error: error.sqlMessage ? error.sqlMessage : "Lo sentimos"
            })   
        }
    }
}