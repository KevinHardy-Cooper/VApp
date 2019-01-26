// Imports
const winston = require('winston');
const fs = require('fs');

// Creating logs directory if it doesn't already exist
if (!fs.existsSync('./logs/')) {
    fs.mkdirSync('./logs/');
}

// Creating a custom format to log
const logFormat = winston.format.printf(log => {
    return `${log.timestamp} ${log.level}: ${log.message}`;
});

// Creating a logger
const logger = winston.loggers.add('category1', {
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/main.log' })
    ]
});

module.exports = logger;