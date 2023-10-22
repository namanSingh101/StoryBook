const express = require("express")
const Router = express.Router()
const {login,dashboard} = require("../controllers")
const {ensureAuth,ensureGuest} = require("../middleware/auth")

Router.get("/",ensureGuest,login)
Router.get("/dashboard",ensureAuth,dashboard)

module.exports = Router