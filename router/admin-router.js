const Router = require('express').Router
const adminController = require('../controllers/admin-controller')
const {body} = require("express-validator");
const adminRouter = new Router()

adminRouter.get('/', adminController.getAll)
adminRouter.get('/:id', adminController.getOne)
adminRouter.delete('/:id', adminController.deleteOne)
adminRouter.post('/bulk-delete',
                 body('ids').isArray(),
                 adminController.deleteMany)

module.exports = adminRouter
