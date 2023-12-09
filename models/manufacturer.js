
const mongoose = require("mongoose")

const manufacturerSchema = new mongoose.Schema({
    name: String,
    regNum: String,
    regCountry: String,
    solanaPubKey: String,
    email: String,
    phoneNum: String,
    address: String,
    password: String,
    auxInfoHash: String
}, {
    timestamps:true
})

const manufacturerModel = mongoose.model("manufacturer", manufacturerSchema)
module.exports = manufacturerModel