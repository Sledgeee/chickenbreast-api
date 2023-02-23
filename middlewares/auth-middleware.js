const ApiError = require('../exceptions/api-error')
const tokenService= require('../services/token-service')

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const adminData = tokenService.validateAccessToken(accessToken)
        if (!adminData) {
            return next(ApiError.UnauthorizedError())
        }

        req.admin = adminData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
