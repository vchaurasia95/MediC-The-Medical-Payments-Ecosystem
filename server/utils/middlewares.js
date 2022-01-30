const console = require("./../logger")

const logRequests = (req, res, next) => {
    console.log(`${req.protocol} | ${req.originalUrl} | ${req.method}`)
    next()
}

module.exports = {
    logRequests
}