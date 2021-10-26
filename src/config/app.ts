import express=require('express');
import * as cors from 'cors';
import * as morgan from 'morgan'
import config from './config';

const server:express.Application=express();
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Access-Control-Allow-Origin'
    ],
    credentials: true,
    methods: 'GET,OPTIONS,PUT,POST',
    origin: '*',
    preflightContinue: false,
};
const port = config.port||3001
server.use(cors.default(options));
server.set('port',port)
// Midlewares
server.use(morgan.default('dev'))
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.listen(server.get('port'),()=>{
    console.log(`Listen in port ${port}`);
})

export const app=server;