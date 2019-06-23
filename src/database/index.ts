import { createConnection } from "typeorm";
import { Movie, User } from "../entities";

export async function getDbConnection() {

    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_USER = process.env.DATABASE_USER || "root";
    const DATABASE_PORT = 3306;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "Aloalo123";
    const DATABASE_DB = "inversify";

    const entities = [Movie, User];

    const conn = await createConnection({
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true
    });

    return conn;

}