const express = require("express")

const router = express.Router()

const userController = require("../controller/userController")

router.post("/register", userController.register)

router.get("/", userController.getUserDetails)
router.get("/all", userController.getAllUserDetails)

module.exports = router