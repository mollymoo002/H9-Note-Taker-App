// --------------- Requires ---------------
// require express to be used in the application
const express = require('express');
const fs = require('fs');
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");
// --------------- Requires ---------------


// creates app which is now an instance of express
const app = express();
// this sets up the port for the local server
const PORT = process.env.PORT || 3000;

// --------------- Middleware ---------------
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// --------------- Middleware ---------------

const notesArray = [];

// -------------- GET function for notes -------------------
// this calls for out notes page, notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", function (err, data) {
        res.send(data);
    })
});
// -------------- GET function for notes -------------------


// POST function for notes
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid,
        };
    

        // read through the data in db file
        fs.readFile("./db/db.json", "utf-8",  (err, data) => {
            const parsedNotes = JSON.parse(data);
            // push the new notes up to the existing notes
            parsedNotes.push(newNote);
        // this stringifies the notes so we can read them on the page
            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
            err ? console.error(err) : console.log("Note ${newNote.title} has been accepted")
            );
        });

    

        const response = {
            status: "success",
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Cannot post note');
    }
});

// delete

// this calls our home page, which is index.html
app.get("*",  (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/api', (req, res) => res.json(notes));

// This prints the port that the app is listening on so we can go to the site
app.listen(PORT, () => {
    console.log(`App listening on PORT: http://localhost:${PORT}`);
});