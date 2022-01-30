const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const hospitalizationRecordModel = require("../models/hospitalizationRecords")


const addHospitalizationRecord = async(req, res) => {
    try{
        console.debug("hospitalizationRecordsController :: addHospitalizationRecord")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("HospitalizationRecords")
        
        let response = await hospitalizationRecordModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("HospitalizationRecords")
        
        return handleResponse(req, res, err=false, response=response, message=messages.success.RECORD_CREATION_SUCCESS)
    }catch(e){
        console.error(`Error in hospitalizationRecordsController : addHospitalizationRecord`)
        console.error(e)
        if(e.message.includes("duplicate")){
            return handleResponse(req, res, err=false, messages.error.DUPLICATE_KEY)
        }
        return handleResponse(req, res, e)
    }
}

const updateHospitalizationRecord = async(req, res) => {
    try{
        console.debug("hospitalizationRecordsController :: updateHospitalizationRecord")
        
        if(_.isEmpty(req.body) || !req.body._id){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let response = await hospitalizationRecordModel.updateOne({
            "_id": req.body._id
        },{
            $set: {"details": req.body.details}
        })

        
        return handleResponse(req, res, err=false, response=response, message=messages.success.RECORD_UPDATION_SUCCESS)
    }catch(e){
        console.error(`Error in hospitalizationRecordsController : updateHospitalizationRecord`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


const getHospitalizationRecord = async(req, res) => {
    try{
        console.debug("hospitalizationRecordsController :: getHospitalizationRecord")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let response = await hospitalizationRecordModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in hospitalizationRecordsController : getHospitalizationRecord`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllHospitalizationRecords = async(req, res) => {
    try{
        console.debug("hospitalizationRecordsController :: getAllHospitalizationRecords")

        let response = await hospitalizationRecordModel.find({})

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in hospitalizationRecordsController : getAllHospitalizationRecords`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    addHospitalizationRecord,
    getHospitalizationRecord,
    getAllHospitalizationRecords,
    updateHospitalizationRecord
}