const mongoose = require("mongoose")

const procedure  = new mongoose.Schema({
	_id: Number,
    details: Object
})

const procedureModel = mongoose.model("Procedures",procedure)

module.exports = procedureModel