const mongoose = require("mongoose")

const procedureDetails  = new mongoose.Schema({
	_id: Number,
    details: Object
})

const procedureDetailsModel = mongoose.model("ProcedureDetails",procedureDetails)

module.exports = procedureDetailsModel