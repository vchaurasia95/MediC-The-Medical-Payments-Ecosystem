const express = require("express")

const router = express.Router()

const procedureController = require("../controller/procedureController")

router.post("/", procedureController.addProcedure)
router.get("/", procedureController.getProcedure)
router.get("/all", procedureController.getAllProcedures)

module.exports = router