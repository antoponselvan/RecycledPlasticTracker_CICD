
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const serverless = require("serverless-http")
require("dotenv").config()


const manufacturerRouter = require("./routes/manufacturerRoutes")
const productRouter = require("./routes/productRoutes")
const generalRouter = require("./routes/generalRoutes")

const app = express()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

mongoose.connect(MONGO_URI)

app.use(express.json())
app.use(cors())
// app.use(express.static("../client/dist"))
app.use(express.static("./client_dist"))

// app.set('views', './client_dist')
// app.set('view engine', 'ejs');

// app.get('/default', (req, res) => {
//   res.render('index');
// })

app.use("/api/general",generalRouter)
app.use("/api/manufacturer", manufacturerRouter)
app.use("/api/product", productRouter)

// Connect to FrontEnd routing
app.get("/*", (req,res)=>{
    // res.sendFile(path.resolve("../client/dist/index.html"))
    res.sendFile(path.resolve("./client_dist/index.html"))
})


if (process.env.ENVIRONMENT === "lambda") {
    module.exports.handler = serverless(app)
}else {
    mongoose.connection.once("open", ()=>{
    console.log("DB connected")
    app.listen(PORT, ()=>{
        console.log("Server Running")
    })
}
)}

