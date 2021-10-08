// require express to be used in the application
const express = require('express');

// creates app which is now an instance of express
const app = express();

// this sets up the port for the local server
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// adds in the routes files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// This prints the port that the app is listening on so we can go to the site
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});