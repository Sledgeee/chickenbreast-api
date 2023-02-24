const Router = require('express').Router
const adminController = require('../controllers/admin-controller')
const {body} = require("express-validator");
const adminRouter = new Router()
const authMiddleware = require('../middlewares/auth-middleware')

adminRouter.get('/', authMiddleware, adminController.getAll)
adminRouter.get('/:id', authMiddleware, adminController.getOne)
adminRouter.delete('/:id', authMiddleware, adminController.deleteOne)
adminRouter.post('/bulk-delete',
                 body('ids').isArray(),
                 authMiddleware,
                 adminController.deleteMany)

module.exports = adminRouter
