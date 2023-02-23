const adminService = require('../services/admin-service')
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/api-error')

class AuthController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { userId, username } = req.body
            const userData = await adminService.register(userId, username)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { username } = req.body
            const data = await adminService.login(username)
            return res.send(data)
        } catch (e) {
            next(e)
        }
    }

    async checkOtp(req, res, next) {
        try {
            const { id, otp } = req.body
            const data = await adminService.checkOtp(id, otp)
            if (data.success) {
                res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
            }
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async magicLogin(req, res, next) {
        try {
            const { userId, username, hash, otp, isMagic } = req.body
            const data = await adminService.magicLogin(userId, username, hash, otp, isMagic)
            if (data.success) {
                res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
            }
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            await adminService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const data = await adminService.refresh(refreshToken)
            res.cookie('refreshToken', data.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async hasRights(req, res, next) {
        try {
            const { userId } = req.params
            const isAdmin = await adminService.hasRights(userId)
            return res.send({ result: isAdmin })
        } catch (e) {
            next(e)
        }
    }

    async hasRequest(req, res, next) {
        try {
            const { userId } = req.params
            const hasRequest = await adminService.hasRequest(userId)
            return res.send({ result: hasRequest })
        } catch (e) {
            next(e)
        }
    }

    async createRequest(req, res, next) {
        try {
            const { userId, username } = req.body
            const request = await adminService.createRequest(userId, username)
            return res.send(request)
        } catch (e) {
            next(e)
        }
    }

    async deleteRequest(req, res, next) {
        try {
            const { userId } = req.params
            await adminService.deleteRequest(userId)
            return res.json({ 'status': 'Deleted' })
        } catch (e) {
            next(e)
        }
    }

    async createMagicLink(req, res, next) {
        try {
            const { userId, username, otp } = req.body
            const attempt = await adminService.createMagicLink(userId, username, otp)
            return res.send(attempt)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()
