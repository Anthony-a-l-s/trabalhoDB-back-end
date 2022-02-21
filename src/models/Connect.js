const { Client } = require('pg');
const dotEnv = require('dotenv').config();

/*const user = dotEnv.parsed.DATABASE_USER
const host = dotEnv.parsed.DATABASE_HOST
const database = dotEnv.parsed.DATABASE_NAME
const password = dotEnv.parsed.DATABASE_PASSWORD
const port = dotEnv.parsed.DATABASE_PORT*/

const user = 'postgres'
const host = 'localhost'
const database = 'banco de dados'
const password = 'vraux'
const port = '5432'

const dbClient = new Client({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
});

dbClient
    .connect()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.log(err));

module.exports = dbClient;