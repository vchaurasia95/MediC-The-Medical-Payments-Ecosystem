const express = require("express")

const router = express.Router()

const policyController = require("../controller/policyController")

router.post("/", policyController.addPolicy)
router.get("/", policyController.getPolicy)
router.get("/all", policyController.getAllPolicies)

module.exports = router