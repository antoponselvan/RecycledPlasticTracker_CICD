
const express = require("express")
const generalRouter = express.Router()
const Manufacturer = require("../models/manufacturer")
const Product = require("../models/product")
const {trackProduct, verifyUser} = require("../controllers/generalControllers")
const {protect} = require("../middleware/protect")

generalRouter.get("/test", (req,res)=>{
    res.json("Hello World!")
})

generalRouter.post("/track", trackProduct)
generalRouter.get("/verifyuser", protect, verifyUser);

module.exports = generalRouter