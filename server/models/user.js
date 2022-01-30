const mongoose = require("mongoose")


const user  = new mongoose.Schema({
	_id: Number,
    details: Object
})

const userModel = mongoose.model("Users",user)
module.exports = userModel