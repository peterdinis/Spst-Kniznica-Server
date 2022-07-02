import {Dialect} from "sequelize/types";

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'PETERdinis1234',
        database: 'developdb',
        logging: false,
        sync: true
    },
    jwtPrivateKey: 'jwtPrivateKey',
};