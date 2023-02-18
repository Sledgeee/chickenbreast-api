const Router = require('express').Router
const authController = require('../controllers/auth-controller')
const authRouter = new Router()
const { body } = require('express-validator')

authRouter.post('/register',
                body('email').isEmail(),
                body('password').isLength({ min: 6, max: 32 }),
                authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/refresh', authController.refresh)

module.exports = authRouter
