const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Nível mínimo de log (info, warn, error, etc.)
    format: format.combine(
        format.timestamp(), // Adiciona timestamp aos logs
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Exibe logs no console
        new transports.File({ filename: 'logs/app.log' }) // Salva logs em arquivo
    ],
});

// Se estiver em ambiente de desenvolvimento, exibe mais detalhes no console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(), // Adiciona cores aos logs
            format.simple()
        )
    }));
}

module.exports = logger;
