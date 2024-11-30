const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Minimum log level (info, warn, error, etc.)
    format: format.combine(
        format.timestamp(), // Adds a timestamp to logs
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Displays logs in the console
        new transports.File({ filename: 'logs/app.log' }) // Saves logs to a file
    ],
});

// If in a development environment, display more detailed logs in the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(), // Adds colors to logs
            format.simple()
        )
    }));
}

module.exports = logger;
