const express = require("express")

const router = express.Router()
const userRouter = require("./user")
const agreementRouter = require("./agreement")
const policyRouter = require("./policy")
const hospitalizationRecordRouter = require("./hospitalizationRecords")
const middlewares = require("./../utils/middlewares")
const procedureRouter = require("./procedure")
const procedureDetailsRouter = require("./procedureDetails")
const billRouter = require("./bill")
const console = require("./../logger")

router.use(middlewares.logRequests)

router.use("/user",userRouter)
router.use("/agreement",agreementRouter)
router.use("/policy",policyRouter)
router.use("/hospitalization-record",hospitalizationRecordRouter)
router.use("/procedure",procedureRouter)
router.use("/procedureDetails",procedureDetailsRouter)
router.use("/bill",billRouter)

module.exports = router