const Router = require('express').Router
const authController = require('../controllers/auth-controller')
const authRouter = new Router()
const { body } = require('express-validator')

authRouter.post('/register',
                body('userId').notEmpty(),
                body('username').notEmpty(),
                authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/check-otp', authController.checkOtp)
authRouter.post('/magic-login', authController.magicLogin)
authRouter.post('/logout', authController.logout)
authRouter.get('/refresh', authController.refresh)
authRouter.post('/has-rights/:userId', authController.hasRights)
authRouter.post('/has-request/:userId', authController.hasRequest)
authRouter.post('/create-request', authController.createRequest)
authRouter.delete('/delete-request/:userId', authController.deleteRequest)
authRouter.post('/cml', authController.createMagicLink)

module.exports = authRouter
