const express = require("express")

const router = express.Router()

const hospitalizationRecordsController = require("../controller/hospitalizationRecordsController")

router.post("/", hospitalizationRecordsController.addHospitalizationRecord)
router.patch("/", hospitalizationRecordsController.updateHospitalizationRecord)

router.get("/", hospitalizationRecordsController.getHospitalizationRecord)
router.get("/all", hospitalizationRecordsController.getAllHospitalizationRecords)

module.exports = router