const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_AT_SECRET, { expiresIn: '60m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_RT_SECRET, { expiresIn: '7d' })
        return { accessToken, refreshToken }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_AT_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_RT_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return (await TokenModel.create({ user: userId, refreshToken }))
    }

    async removeToken(refreshToken) {
        return (await TokenModel.deleteOne({ refreshToken }))
    }

    async findToken(refreshToken) {
        return (await tokenModel.findOne({ refreshToken }))
    }
}

module.exports = new TokenService()
