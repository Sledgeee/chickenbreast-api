const Router = require('express').Router
const categoryController = require('../controllers/category-controller')
const categoryRouter = new Router()
const { body } = require('express-validator')

categoryRouter.get('/', categoryController.getAll)
categoryRouter.get('/:id', categoryController.getOne)
categoryRouter.post('/',
                    body('name').notEmpty(),
                    categoryController.createOne)

module.exports = categoryRouter
