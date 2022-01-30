const mongoose = require("mongoose")


const policy  = new mongoose.Schema({
	_id: Number,
    details: Object
})

const policyModel = mongoose.model("Policies",policy)

module.exports = policyModel