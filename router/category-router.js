const Router = require('express').Router
const categoryController = require('../controllers/category-controller')
const categoryRouter = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

categoryRouter.get('/', categoryController.getAll)
categoryRouter.get('/:id', categoryController.getOne)
categoryRouter.post('/',
                    authMiddleware,
                    body('name').notEmpty(),
                    categoryController.createOne)
categoryRouter.delete('/:id', authMiddleware, categoryController.deleteOne)
categoryRouter.post('/bulk-delete',
                    authMiddleware,
                    body('ids').isArray(),
                    categoryController.deleteMany)

module.exports = categoryRouter
