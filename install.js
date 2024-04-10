
const { Client } = require("pg");
require("dotenv").config();

//Anslutning till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl:
    {
        rejectUnauthorized: false,
    },
});

client.connect((error) => {
    if (error) {
        console.log("Det gick inte att ansluta" + error);
    } else {
        console.log("Ansluten till databasen");
    }
});

//Skapa tabell till databas
client.query (`
DROP TABLE IF EXISTS cv;

    CREATE TABLE cv(
        cv_id           SERIAL PRIMARY KEY,
        job_title       TEXT NOT NULL,
        company_name    TEXT NOT NULL,
        location        TEXT NOT NULL,
        description     TEXT NOT NULL
    )
`);