const Router = require('express').Router
const departmentController = require('../controllers/department-controller')
const departmentRouter = new Router()
const { body } = require('express-validator')

departmentRouter.get('/', departmentController.getAll)
departmentRouter.get('/:id', departmentController.getOne)
departmentRouter.post('/',
                 body('city').notEmpty(),
                 body('addresses').isArray(),
                 departmentController.createOne)
departmentRouter.put('/:id',
                      body('addresses').isArray(),
                      departmentController.updateOne)

module.exports = departmentRouter
