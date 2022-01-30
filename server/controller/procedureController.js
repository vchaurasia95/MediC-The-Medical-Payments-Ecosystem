const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const procedureModel = require("../models/procedure")



const addProcedure = async(req, res) => {
    try{
        console.debug("procedureController :: addProcedure")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("Procedures")
        
        let response = await procedureModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("Procedures")
        
        return handleResponse(req, res, err=false, response=response, message=messages.success.procedure_CREATION_SUCCESS)   
    }catch(e){
        console.error(`Error in procedureController : addProcedure`)
        console.error(e)
        if(e.message.includes("duplicate")){
            return handleResponse(req, res, err=false, messages.error.DUPLICATE_KEY)
        }
        return handleResponse(req, res, e)
    }
}


const getProcedure = async(req, res) => {
    try{
        console.debug("procedureController :: getProcedure")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let response = await procedureModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in procedureController : getProcedure`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllProcedures = async(req, res) => {
    try{
        console.debug("procedureController :: getAllProcedures")

        let response = await procedureModel.find({})

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in procedureController : getAllProcedures`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    addProcedure,
    getProcedure,
    getAllProcedures
}