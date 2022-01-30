const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const agreementModel = require("../models/agreement")
// const dbinstance = dbConnect.dbinstance()



const addAgreement = async(req, res) => {
    try{
        console.debug("agreementController :: addAgreement")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("Agreements")
        
        let created_agreement = await agreementModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("Agreements")
        
        return handleResponse(req, res, err=false, response=created_agreement, message=messages.success.AGREEMENT_CREATION_SUCCESS)
    }catch(e){
        console.error(`Error in agreementController : addAgreement`)
        console.error(e)
        if(e.message.includes("duplicate")){
            return handleResponse(req, res, messages.error.DUPLICATE_KEY)
        }
        return handleResponse(req, res, e)
    }
}


const getAgreement = async(req, res) => {
    try{
        console.debug("agreementController :: getAgreement")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let user = await agreementModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=user)
    }catch(e){
        console.error(`Error in agreementController : getAgreement`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllAgreements = async(req, res) => {
    try{
        console.debug("agreementController :: getAllAgreements")

        let user = await agreementModel.find({})

        return handleResponse(req=req, res=res, err=false, response=user)
    }catch(e){
        console.error(`Error in agreementController : getAllAgreements`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    addAgreement,
    getAgreement,
    getAllAgreements
}