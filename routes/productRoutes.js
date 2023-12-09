
const express = require("express")
const productRouter = express.Router()

const {getAllProducts, getProductDetails, registerProduct} = require("../controllers/productController")
const {protect} = require("../middleware/protect")

productRouter.get("/getall", protect, getAllProducts)
productRouter.get("/getone/:id", getProductDetails)
productRouter.post("/register", protect, registerProduct)

module.exports = productRouter