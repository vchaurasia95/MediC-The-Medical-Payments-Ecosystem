const mongoose = require("mongoose")


const counter  = new mongoose.Schema({
	model_name: {
        type:String,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
})

const counterModel = mongoose.model("Counter",counter)
module.exports = counterModel