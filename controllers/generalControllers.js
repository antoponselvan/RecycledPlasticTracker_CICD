
const Manufacturer = require("../models/manufacturer")
const Product = require("../models/product")

const trackProduct = async (req, res) => {
    const {solanaPubKey, serialNum} = req.body
    const trackDetails = []
    // console.log(solanaPubKey, serialNum)
    try{

        let manufacturer = await Manufacturer.findOne({solanaPubKey})
        if (!(manufacturer)){
            res.status(400).json({msg:"No such manufacturer"})
            return
        }
        // manufacturer = manufacturer.toObject()
        let product = await Product.findOne({
            manufacturerId:manufacturer._id,
            serialNum
        }) 
        if (!(product)){
            res.status(400).json({msg:"No such product found"})
            return
        }
        trackDetails.push({
            productId: product._id,
            manufacturerName: manufacturer.name,
            productName: product.name,
            rePlasticPct: product.rePlasticPct,
            lat: product.manufacLocLatDeg,
            lng: product.manufacLocLongDeg,
            location: ("Lat:"+String(product.manufacLocLatDeg)+" - Long:"+String(product.manufacLocLongDeg)),
            saleDate: (String(product.saleDate)+"-"+String(product.saleMonth)+"-"+String(product.saleYear))
        })
        let recyclingStartPoint = product.recyclingStartPoint
        console.log(trackDetails, recyclingStartPoint)
        while (!recyclingStartPoint){
            product = await Product.findById(product.ingridientId)
            manufacturer = await Manufacturer.findById(product.manufacturerId)
            recyclingStartPoint = product.recyclingStartPoint
            trackDetails.push({
                productId: product._id,
                manufacturerName: manufacturer.name,
                productName: product.name,
                rePlasticPct: product.rePlasticPct,
                lat: product.manufacLocLatDeg,
                lng: product.manufacLocLongDeg,
                location: ("Lat:"+String(product.manufacLocLatDeg)+" - Long:"+String(product.manufacLocLongDeg)),
                saleDate: (String(product.saleDate)+"-"+String(product.saleMonth)+"-"+String(product.saleYear))
            })
        }
        res.status(200).json(trackDetails)
        return
    }catch(error){
        console.log(error)
        res.status(500).json({mg:"Unknown server error"})
    }

    // res.json("Track product")
}

const verifyUser = async (req,res) =>{
    const manufacturerId = req.manufacturerId
    try{
        const manufacturer = await Manufacturer.findById(manufacturerId)
        if (!manufacturer){
            res.status(404).json({msg:"No user found"})
            return
        }
        
        let manufacturerObj = manufacturer.toObject()
        delete manufacturerObj.password
        res.status(200).json({
            manufacturer:manufacturerObj,
            msg:"Manufacturer Verified"})
        return        
       
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Unknown Server Error"})
    }
}

module.exports = {trackProduct, verifyUser}
