/*
    MOD-001
*/

// Imports
const express = require("express");
const Router = require("./Router.js");
const Connector = require("./Connector");
const logger = require("../config/log.js");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("src/api-docs/swagger.yaml");
const cors = require("cors");

// Creating the Express app
const app = express();

// Use cors before router
// Allow CORS for front-end server communication
app.use(cors({ credentials: true, origin: true }));

// Adding router and connector to the middleware handling path
app.use("/", Router);
app.use("/", Connector);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// If this environment variable has been set, then it is assumed that we are on a production machine
if (process.env.PORT) {
  // Imports relevant to production
  const fs = require("fs");
  const https = require("https");

  // Options required for HTTPS authentication
  let options = {
    key: fs.readFileSync("./keys/privatekey.pem"),
    cert: fs.readFileSync("./keys/server.crt")
  };

  // Firing the server up to whatever port the hosting service provides, or to 30$
  https.createServer(options, app).listen(process.env.PORT, function() {
    logger.info(
      "VApp 🔒️listening securely on a port specified in the environment variables!"
    );
  });
} else {
  // Imports relevant to development
  const http = require("http");

  // Firing the server up to 3000 for localhost
  http.createServer(app).listen(3000, function() {
    logger.info("VApp 🔒️listening insecurely on port 3000!");
  });
}
