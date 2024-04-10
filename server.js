const { Client } = require("pg");
require("dotenv").config();

//Express
const express = require("express");
const app = express();


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

//Starta igång server
app.listen(process.env.PORT, () => {
    console.log("servern är startad på port: " + process.env.PORT);
});
