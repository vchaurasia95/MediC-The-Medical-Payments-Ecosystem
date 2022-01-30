const express = require("express")

const router = express.Router()

const procedureDetailsController = require("../controller/procedureDetailsController")

router.post("/", procedureDetailsController.addProcedureDetails)
router.get("/", procedureDetailsController.getProcedureDetails)
router.get("/all", procedureDetailsController.getAllProcedureDetails)

module.exports = router