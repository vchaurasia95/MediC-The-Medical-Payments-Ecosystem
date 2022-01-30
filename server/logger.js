const winston = require("winston")

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            prettyPrint: false,
            colorize: winston.format.colorize({all:true}),
            silent:false,
            timestamp: true,
            json: false,
            format: winston.format.combine(
                winston.format.colorize({all:true}),
                winston.format.simple()
            )
        })
    ]
})


module.exports = {
    log(message, optionalParams) {
        if(optionalParams) {
            message = message + " " + optionalParams
        }
        logger.log({
            level: "info",
            message: message
        })
    },
    error(message, optionalParams) {
        if(optionalParams) {
            message = message + " " + optionalParams
        }
        logger.log({
            level: "error",
            message: message
        })
    },
    debug(message, optionalParams) {
        if(optionalParams) {
            message = message + " " + optionalParams
        }
        logger.log({
            level: "debug",
            message: message
        })
    },
    levels: {
        error: "error",
        info: "info",
        debug: "debug"
    }
}