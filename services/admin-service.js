const AdminModel = require('../models/admin-model')
const AdminRequestModel = require('../models/admin-request-model')
const LoginAttemptModel = require('../models/login-attempt-model')
const tokenService = require('../services/token-service')
const ApiError = require('../exceptions/api-error')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TELEGRAM_API_KEY)

class AdminService {
    async register(userId, username) {
        const candidate = await AdminModel.findOne({ username })
        if (candidate) {
            throw ApiError.BadRequest('User with given username already exists')
        }
        return await AdminModel.create({ userId, username })
    }

    async login(username) {
        const admin = await AdminModel.findOne({ username })
        if (admin) {
            await LoginAttemptModel.deleteMany({ userId: admin.userId })
            const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
            const loginAttempt = await LoginAttemptModel.create({
                userId: admin.userId,
                username,
                otp,
                isMagic: false
            })
            new Promise(() => bot.telegram.sendMessage(admin.userId, String(otp))).catch(e => console.log(e))
            return { accepted: true, userId: admin.userId, attemptId: loginAttempt.id }
        }
        return { accepted: false }
    }

    async checkOtp(id, otp) {
        const attempt = await LoginAttemptModel.findOne({ _id: id, otp })
        if (attempt) {
            await LoginAttemptModel.deleteOne({ _id: id, otp })
            const { userId, username } = attempt
            let userPhoto = "/assets/images/avatars/avatar_default.jpg"
            const profilePhotos = await bot.telegram.getUserProfilePhotos(userId)
            if (profilePhotos.total_count > 0) {
                userPhoto = await bot.telegram.getFileLink(profilePhotos.photos[0][0].file_id)
            }
            const tokens = tokenService.generateTokens({ userId, username, userPhoto })
            const admin = await AdminModel.findOne({ userId, username })
            await tokenService.saveToken(admin._id, tokens.refreshToken)
            return {
                success: true,
                admin: {
                    userId,
                    username,
                    pic: userPhoto
                },
                tokens
            }
        }
        return { success: false }
    }

    async magicLogin(userId, username, hash, isMagic) {
        const now = dayjs.utc()
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        const attempt = await LoginAttemptModel.findOne({
            _id: hash,
            userId,
            username,
            otp,
            isMagic
        })
        if (!attempt) {
            return { success: false }
        }
        await LoginAttemptModel.deleteOne({ _id: hash })
        const attemptDate = dayjs(attempt.createdAt)
        const diff = now.diff(attemptDate, 'minutes')
        if (diff <= 5) {
            let userPhoto = "/assets/images/avatars/avatar_default.jpg"
            const profilePhotos = await bot.telegram.getUserProfilePhotos(userId)
            if (profilePhotos.total_count > 0) {
                userPhoto = await bot.telegram.getFileLink(profilePhotos.photos[0][0].file_id)
            }
            const tokens = tokenService.generateTokens({ userId, username, userPhoto })
            await tokenService.saveToken(hash, tokens.refreshToken)
            return {
                success: true,
                admin: {
                    userId,
                    username,
                    pic: userPhoto
                },
                tokens
            }
        }
        return { success: false }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const { _id, userId, username } = await AdminModel.findById(userData.id)
        const tokens = tokenService.generateTokens({ userId, username })
        await tokenService.saveToken(_id, tokens.refreshToken)
        return { ...tokens, admin: { userId, username } }
    }

    async hasRights(userId) {
        const admin = await AdminModel.findOne({ userId })
        return admin !== null
    }

    async hasRequest(userId) {
        const request = await AdminRequestModel.findOne({ userId })
        return request !== null
    }

    async createRequest(userId, username) {
        return await AdminRequestModel.create({
            userId,
            username
        })
    }

    async deleteRequest(userId) {
        await AdminRequestModel.deleteOne({ userId })
    }

    async createMagicLink(userId, username) {
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        await LoginAttemptModel.deleteMany({ userId })
        return await LoginAttemptModel.create({
            userId,
            username,
            otp,
            isMagic: true
        })
    }

    async getAll() {
        return await AdminModel.find({})
    }

    async getOne(id) {
        return await AdminModel.findById(id)
    }

    async deleteOne(id) {
        return await AdminModel.deleteOne({ _id: id, role: "Manager" })
    }

    async deleteMany(ids) {
        return await AdminModel.deleteMany({ _id: { $in: ids }, role: "Manager" })
    }
}

module.exports = new AdminService()
