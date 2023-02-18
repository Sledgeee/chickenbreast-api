const Router = require('express').Router
const recipeController = require('../controllers/order-controller')
const recipeRouter = new Router()
const { body } = require('express-validator')

recipeRouter.get('/', recipeController.getAll)
recipeRouter.get('/:id', recipeController.getOne)
recipeRouter.post('/',
                  body('name').isEmail(),
                  body('time').notEmpty(),
                  body('image').isNumeric(),
                  body('ingridients').notEmpty().isArray(),
                  body('instruction').notEmpty(),
                  recipeController.createOne)

module.exports = recipeRouter
