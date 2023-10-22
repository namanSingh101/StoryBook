const {StatusCodes} = require("http-status-codes")

const notFoundRoute = (req,res)=>{
    return res.status(StatusCodes.NOT_FOUND).json({msg:"Route Not Found"})
}

module.exports = notFoundRoute