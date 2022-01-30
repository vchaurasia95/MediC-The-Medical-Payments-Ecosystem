const mongoose = require("mongoose")

const bill  = new mongoose.Schema({
    _id: Number,
	details: Object
})

const billModel = mongoose.model("Bills",bill)
module.exports = billModel