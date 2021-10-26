import config from './config';
import util from 'util';
import mysql from 'mysql';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const database = new JsonDB(new Config("sneaker", true, false, "/"));
// db.push("/test1","super test");
const data = database.getData("/sneakers");
// console.log(data);

// Conexion a la base de datos
const dbConfig = {
    host:config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
}

export const db = database;

export function connection() {
    const connection = mysql.createConnection( dbConfig );
    return {
        query( sql, args ) {
        return util.promisify( connection.query )
            .call( connection, sql, args );
        },
        queryWithHeader( sql, args ) {
            return util.promisify( connection.query )
                .call( connection, sql, args )
        },
        close() {
        return util.promisify( connection.end ).call( connection );
        },
        beginTransaction() {
            return util.promisify( connection.beginTransaction )
            .call( connection );
        },
        commit() {
        return util.promisify( connection.commit )
            .call( connection );
        },
        rollback() {
        return util.promisify( connection.rollback )
            .call( connection );
        }
    };
}

export async function withTransaction( callback ) {
    const db = connection();
    try {
        await db.beginTransaction();
        await callback();
        await db.commit();
    } catch ( err ) {
        await db.rollback();
        throw err;
    } finally {
        await db.close();
    }
}