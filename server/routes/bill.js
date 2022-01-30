const express = require("express")

const router = express.Router()

const billController = require("../controller/billController")

router.post("/", billController.addBill)
router.get("/", billController.getBill)
router.get("/all", billController.getAllBills)
router.patch("/", billController.updateBill)
module.exports = router