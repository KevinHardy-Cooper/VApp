/*
    MOD-001
*/

// Imports
const express = require("express");
const Router = require("./Router.js");
const Connector = require("./Connector");
const logger = require("../config/log.js");

// Creating the Express app
const app = express();

// Adding router and connector to the middleware handling path
app.use("/", Router);
app.use("/", Connector);

// Firing the server up to whatever port the hosting service provides, or to 3000 for localhost
app.listen(process.env.PORT || 3000, function() {
	logger.info("VApp 🔒️ listening on port 3000 or another port if hosted!");
});
