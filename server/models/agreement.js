const mongoose = require("mongoose")

const agreement  = new mongoose.Schema({
    _id: Number,
	details: Object
})

const agreementModel = mongoose.model("Agreements",agreement)
module.exports = agreementModel