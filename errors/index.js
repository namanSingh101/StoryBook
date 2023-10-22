const CustomApiError = require("./customApiError")
const BadRequest = require("./badRequestError")
const NotFound = require("./notFoundError")
const AuthenticationError = require("./unAuthError")


module.exports  = {
    CustomApiError,
    BadRequest,
    NotFound,
    AuthenticationError
}