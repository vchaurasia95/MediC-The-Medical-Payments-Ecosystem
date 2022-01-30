const express = require("express")

const router = express.Router()

const agreementController = require("../controller/agreementController")

router.post("/", agreementController.addAgreement)

router.get("/", agreementController.getAgreement)
router.get("/all", agreementController.getAllAgreements)

module.exports = router