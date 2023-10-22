const {StatusCodes} = require("http-status-codes")
const {CustomApiError} = require("../errors")

const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err);
    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message||"Something went wrong please try again later"
      }

      return res.status(customError.statusCode).json({issue:customError.msg})

}

module.exports = errorHandlerMiddleware