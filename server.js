const { Client } = require("pg");
require("dotenv").config();

//Express
const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());

// Aktivera CORS middleware för alla rutter
app.use(cors());


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

//Routing API
app.get("/api", (req, res) => {
    res.json([{ message: "Welcome to my REST API"}, {name: "Mattias"}]);
});

app.get("/api/cv", (req,res) => {
    res.json({message: "Get API för alla CV"});
});

app.post("/api/cv", async (req,res) => {

    const jobTitle = req.body.jobTitle;
    const companyName = req.body.companyName;
    const location = req.body.location;
    const description = req.body.description;

    if(jobTitle && companyName && location && description) {

        const result = await client.query("INSERT INTO cv(job_title, company_name, location, description) values ($1, $2, $3, $4)",
            [jobTitle, companyName, location, description]);

        res.json({message: result});
        
    } else {
        res.json({message: "Error: Alla värden är inte satta"});
    }
});

app.put("/api/cv/:cvId", (req,res) => {
    res.json({message: "Put för att uppdatera specifikt CV via ID"});
});

app.delete("/api/cv/:cvId", (req,res) => {
    res.json({message: "Delete för att ta bort specifik CV"});
});