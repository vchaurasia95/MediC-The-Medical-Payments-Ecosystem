const express = require("express")

const console = require("../logger")

const messages = require("../utils/messages")

const _ = require("lodash")

const dbConnect = require("../utils/dbConnect")
const userModel = require("../models/user")
const dbinstance = dbConnect.dbinstance()

const register = async(req, res) => {
    try{
        console.debug("userController :: register")
        
        if(_.isEmpty(req.body)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let index = await dbConnect.getCounterForId("Users")
        
        let created_user = await userModel.create({
            "_id": index,
            "details": req.body.details
        })

        await dbConnect.updateCounterModel("Users")
        
        return handleResponse(req, res, err=false, response=created_user, message=messages.success.USER_REGISTER_SUCCESS)
    }catch(e){
        console.error(`Error in userController : register`)
        if(e.message.includes("duplicate")){
            console.error("Duplicate key error : Can be ignored.")
            return handleResponse(req, res, messages.error.DUPLICATE_KEY)
        }
        console.error(e)
        return handleResponse(req, res, e)
    }
}


const getUserDetails = async(req, res) => {
    try{
        console.debug("userController :: getUserDetails")
        
        if(_.isEmpty(req.query._id)){
            console.error("Req body is empty")
            return handleResponse(req, res, messages.error.BAD_REQUEST)
        }
        
        let user = await userModel.findOne({
            "_id": req.query._id
        })

        return handleResponse(req=req, res=res, err=false, response=user)
    }catch(e){
        console.error(`Error in userController : getUserDetails`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}

const getAllUserDetails = async(req, res) => {
    try{
        console.debug("userController :: getAllUserDetails")

        let user = await userModel.find({})

        return handleResponse(req=req, res=res, err=false, response=user)
    }catch(e){
        console.error(`Error in userController : getAllUserDetails`)
        console.error(e)
        return handleResponse(req, res, e)
    }
}


module.exports = {
    register,
    getUserDetails,
    getAllUserDetails
}