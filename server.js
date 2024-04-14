//Api Skal

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

//Get

//Test
app.get("/api", (req, res) => {
    res.json([{ message: "Welcome to my REST API" }, { name: "Hanin" }]);
});

app.get("/api/cv", (req, res) => {

    client.query("SELECT * FROM cv;", (error, result) => {
        if (error) {
            res.status(500).json({ error: "Något gick fel" + error });
            return;
        } else {
            res.json(result.rows);
        }
    });
});

//Hämta specifik CV
app.get("/api/cv/:cvId", (req, res) => {

    let cvId = req.params.cvId;

    client.query("SELECT * FROM cv WHERE cv_id = $1", [cvId], (error, result) => {
        if (error) {
            res.status(500).json({ error: "Något gick fel" + error });
            return;
        } else {
            res.json(result.rows);
        }
    });
});


//Post(Lägga till)
app.post("/api/cv", async (req, res) => {

    let { jobTitle, companyName, location, description } = req.body;

    //Error
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (jobTitle && companyName && location && description) {

        const result = await client.query("INSERT INTO cv(job_title, company_name, location, description) values ($1, $2, $3, $4)",
            [jobTitle, companyName, location, description]);

        res.json({ message: result });

    } else {
        //Error messages
        errors.message = "Error: Alla värden är inte satta";
        errors.detail = "Fyll i alla fält"

        //Response code
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
    }
});

//Put(uppdatera)
app.put("/api/cv/:cvId", async (req, res) => {

    let { jobTitle, companyName, location, description } = req.body;

    //Error
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    }


    let cvId = req.params.cvId;

    if (jobTitle && companyName && location && description) {

        //Uppdatera cv från databas tabellen cv
        const updateResult = await client.query("UPDATE cv SET job_title=$1, company_name=$2, location= $3, description= $4 WHERE cv_id = $5", [jobTitle, companyName, location, description, cvId]);

        res.json({ message: "Uppdaterad cv:" + req.params.cvId });

    } else {
        //Error messages
        errors.message = "Error: Alla värden är inte satta";
        errors.detail = "Fyll i alla fält"

        //Response code
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
    }

});



//Delete(ta bort)
app.delete("/api/cv/:cvId", (req, res) => {
    let cvId = req.params.cvId;

    //Radera cv från databas tabellen cv
    const deletedResult = client.query("DELETE FROM cv WHERE cv_id=$1;", [cvId], (error) => {
        if (error) {
            res.status(500).json({ error: "Något gick fel" + error });
            return;
            
        } else {
            res.json({ message: "Raderad cv:" + req.params.cvId });
        }
    })

});

