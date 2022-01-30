const mongoose = require("mongoose")

const hospitalizationRecord  = new mongoose.Schema({
    _id: Number,
	details: Object
})

const hospitalizationRecordModel = mongoose.model("HospitalizationRecords",hospitalizationRecord)
module.exports = hospitalizationRecordModel