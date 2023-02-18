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
                 body('phone').notEmpty(),
                 body('productsQuantity').isNumeric(),
                 body('address').notEmpty(),
                 orderController.createOne)

module.exports = orderRouter
