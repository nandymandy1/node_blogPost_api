// Bring in Express
const express = require('express');
//  Bring in Mongoose
const mongoose = require('mongoose');
// Bring in BodyParser
const bodyParser = require('body-parser');
// Bring in Cors
const cors = require('cors');
// Bring in Path Modules
const path = require('path');

// Initialization of app
const app = express();

// Bring in  Database Configuration
const db = require('./config/db').database;

// Bring in the Post Route
const posts = require('./routes/api/posts');

// Connecting to the Database
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database Connected Successfully');
}).catch((err) => {
    console.log('Unable to connect with the database');
})

// Defining the port
const PORT = process.env.PORT || 5000;

// Cors middlewares
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser middleware
app.use(bodyParser.json());

// Setting up Post Routes
app.use('/api/posts', posts);

// Set the Default Page as Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Listening for the server on PORT
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
})