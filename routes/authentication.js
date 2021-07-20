"use strict"
var express = require("express");
var router = express.Router();
var authController = require("../components/authentication/auth.controller")

router.post("/login",authController.login)

module.exports = router