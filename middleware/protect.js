
const jwt = require("jsonwebtoken")

const protect = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET)
        // console.log(decoded.id)
        req.manufacturerId = decoded._id
        next();
    }catch(error){
        console.log(error)
        res.status(401).json({msg:"Not authorized"})
    }
}

module.exports = {protect}