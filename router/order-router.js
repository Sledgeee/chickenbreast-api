const Router = require('express').Router
const orderController = require('../controllers/order-controller')
const orderRouter = new Router()
const { body } = require('express-validator')

orderRouter.get('/', orderController.getAll)
orderRouter.get('/:id', orderController.getOne)
orderRouter.post('/',
                 body('firstName').notEmpty(),
                 body('lastName').notEmpty(),
                 body('email').isEmail(),
                 body('phone').isMobilePhone('uk-UA'),
                 body('city').isString(),
                 body('address').isString(),
                 body('productsQuantity').isNumeric(),
                 body('moneyAmount').isNumeric(),
                 body('items').isArray(),
                 orderController.createOne)

module.exports = orderRouter
