const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const billModel = require("../models/bill")
// const dbinstance = dbConnect.dbinstance()



const addBill = async(req, res) => {
    try{
        console.debug("billController :: addBill")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("Bills")
        
        let created_bill = await billModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("Bills")
        
        return handleResponse(req, res, err=false, response=created_bill, message=messages.success.BILL_CREATION_SUCCESS)
    }catch(e){
        console.error(`Error in billController : addBill`)
        console.error(e)
        if(e.message.includes("duplicate")){
            return handleResponse(req, res, messages.error.DUPLICATE_KEY)
        }
        return handleResponse(req, res, e)
    }
}


const getBill = async(req, res) => {
    try{
        console.debug("billController :: getBill")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let user = await billModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=user)
    }catch(e){
        console.error(`Error in billController : getBill`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllBills = async(req, res) => {
    try{
        console.debug("billController :: getAllBills")

        let user = await billModel.find({})

        return handleResponse(req=req, res=res, err=false, response=user)
    }catch(e){
        console.error(`Error in billController : getAllBills`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const updateBill = async(req, res) => {
    try{
        console.debug("billController :: billController")
        
        if(_.isEmpty(req.body) || !req.body._id){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let response = await billModel.updateOne({
            "_id": req.body._id
        },{
            $set: {"details": req.body.details}
        })

        
        return handleResponse(req, res, err=false, response=response, message=messages.success.RECORD_UPDATION_SUCCESS)
    }catch(e){
        console.error(`Error in billController : updateBill`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    addBill,
    getBill,
    getAllBills,
    updateBill
}