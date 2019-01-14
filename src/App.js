/*
    MOD-001
*/

// Imports
const express = require('express');
const Routes = require('./Router.js');

// Creating the Express app
const app = express();

// Adding router to the middleware handling path
app.use('/', Routes);

// Firing the server up to whatever port the hosting service provides, or to 3000 for localhost
app.listen(process.env.PORT || 3000, function() {
    console.log('VApp 🔒️ listening on port 3000 or another port if hosted!');
});
