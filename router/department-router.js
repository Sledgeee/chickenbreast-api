const Router = require('express').Router
const departmentController = require('../controllers/department-controller')
const departmentRouter = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

departmentRouter.get('/', departmentController.getAll)
departmentRouter.get('/:id', departmentController.getOne)
departmentRouter.post('/',
                      authMiddleware,
                      body('city').notEmpty(),
                      body('addresses').isArray(),
                      departmentController.createOne)
departmentRouter.put('/:id',
                     authMiddleware,
                     body('addresses').isArray(),
                     departmentController.updateOne)

module.exports = departmentRouter
