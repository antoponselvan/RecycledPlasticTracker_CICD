
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    manufacturerId: {type:mongoose.Schema.Types.ObjectId, ref:"manufacturer"},
    name: String,
    description: String,
    serialNum: String,
    rePlasticPct: Number,
    purchaserId: {type:mongoose.Schema.Types.ObjectId, ref:"manufacturer"},
    ingridientId: {type:mongoose.Schema.Types.ObjectId, ref:"product"},
    // weightKg: {type: Number, default:100},
    saleYear: Number,
    saleMonth: Number,
    saleDate: Number,
    manufacLocLatDeg: Number,
    manufacLocLongDeg: Number,
    recyclingStartPoint:Boolean
    // Need to add AuxInfoHash
},{
    timestamps:true
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel