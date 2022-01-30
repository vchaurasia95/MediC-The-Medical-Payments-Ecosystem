const { update } = require("lodash")
const mongoose = require("mongoose")
const counterModel = require("../models/counter")

const dbinstance = async() => {
    try{
        console.log("dbConnect :: dbinstance")
        let connection = await mongoose.connect(`${process.env.DB_URL}`)
        console.debug("Connected to DB")
        let counter = await (await counterModel.find({}))
        counter = counter.length
        console.debug(`Counters : ${counter}`)
        // models = ["Users", "Agreements", "HospitalizationRecords", "Policies"]
        models = [
            {model_name:"Users"}, 
            {model_name:"Agreements"}, 
            {model_name:"HospitalizationRecords"}, 
            {model_name:"Policies"}, 
            {model_name:"Procedures"},
            {model_name:"Bills"},
            {model_name:"ProcedureDetails"}
        ]

        try{
            // console.debug("Creating Counters")
            await counterModel.insertMany(models, {ordered:false})
        }catch(e){
            // console.error(e)
            console.error("Duplicate Keys in DB Insert prevented")
        }
        

        return connection
    }catch(e){
        console.error(e)
        throw Error(e)
    }
}

const getCounterForId = async(modelName) => {
    try{
        console.log("dbConnect :: getCounterForId")
        let response = await counterModel.findOne({model_name: modelName})
        let count = response.count

        return count + 1
    }catch(e){
        console.error(e)
        throw Error(e)
    }
}

const updateCounterModel = async(modelName) => {
    try{
        console.log("dbConnect :: updateCounterModel")
        await counterModel.updateOne({model_name: modelName}, {
            '$inc': {"count":1}
        })
    }catch(e){
        console.error(e)
        throw Error(e)
    }
    
}

module.exports = {
    dbinstance,
    getCounterForId,
    updateCounterModel
}