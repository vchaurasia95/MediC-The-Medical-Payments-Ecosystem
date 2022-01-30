const console = require("./logger")
global.handleResponse = function(req, res, err=false, response = "", message = "") {
    // console.debug(`ERR : ${err}\nResponse : ${response}\nMessage : ${message}`)
    if(err) {
        return res.status(err.statusCode || 400).json({
            status: "error",
            code: err.code || "Bad Request",
            message: err.message || err,
            result: ""
        })
    }else{
        return res.status(200).json({
            status: "success",
            code: 200,
            message: message,
            result: response
        })
    }
}