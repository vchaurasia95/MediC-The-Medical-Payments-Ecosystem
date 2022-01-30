const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const procedureDetailsModel = require("../models/procedureDetails")



const addProcedureDetails = async(req, res) => {
    try{
        console.debug("procedureDetailsController :: addProcedureDetails")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("ProcedureDetails")
        
        let response = await procedureDetailsModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("ProcedureDetails")
        
        return handleResponse(req, res, err=false, response=response, message=messages.success.procedureDetails_CREATION_SUCCESS)   
    }catch(e){
        console.error(`Error in procedureDetailsController : addProcedureDetails`)
        console.error(e)
        if(e.message.includes("duplicate")){
            return handleResponse(req, res, err=false, messages.error.DUPLICATE_KEY)
        }
        return handleResponse(req, res, e)
    }
}


const getProcedureDetails = async(req, res) => {
    try{
        console.debug("procedureDetailsController :: getProcedureDetails")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let response = await procedureDetailsModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in procedureDetailsController : getProcedureDetails`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllProcedureDetails = async(req, res) => {
    try{
        console.debug("procedureDetailsController :: getAllProcedureDetails")

        let response = await procedureDetailsModel.find({})

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in procedureDetailsController : getAllProcedureDetails`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    addProcedureDetails,
    getProcedureDetails,
    getAllProcedureDetails
}