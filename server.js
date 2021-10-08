// require express to be used in the application
const express = require('express');
const fs = require('fs');
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");

// creates app which is now an instance of express
const app = express();

// this sets up the port for the local server
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET function
app.get("/api/notes", (req, res) => {
    res/sendFile(path.join(__dirname, "/db/db.json"))
});

// POST function
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    // create a unique identifier for each new note created
    newNotes.id = uuid.v4();
    // push the new notes up to the existing notes
    notes.push(newNotes);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
})

// delete

// this calls our home page, which is index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// this calls for out notes page, notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// This prints the port that the app is listening on so we can go to the site
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});