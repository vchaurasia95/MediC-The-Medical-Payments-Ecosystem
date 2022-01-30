const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const policyModel = require("../models/policy")



const addPolicy = async(req, res) => {
    try{
        console.debug("policyController :: addPolicy")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("Policies")
        
        let response = await policyModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("Policies")
        
        return handleResponse(req, res, err=false, response=response, message=messages.success.POLICY_CREATION_SUCCESS)
    }catch(e){
        console.error(`Error in policyController : addPolicy`)
        console.error(e)
        if(e.message.includes("duplicate")){
            return handleResponse(req, res, err=false, messages.error.DUPLICATE_KEY)
        }
        return handleResponse(req, res, e)
    }
}


const getPolicy = async(req, res) => {
    try{
        console.debug("policyController :: getPolicy")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let response = await policyModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in policyController : getPolicy`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllPolicies = async(req, res) => {
    try{
        console.debug("policyController :: getAllPolicies")

        let response = await policyModel.find({})

        return handleResponse(req=req, res=res, err=false, response=response)
    }catch(e){
        console.error(`Error in policyController : getAllPolicies`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    addPolicy,
    getPolicy,
    getAllPolicies
}