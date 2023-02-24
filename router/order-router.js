const Router = require('express').Router
const orderController = require('../controllers/order-controller')
const orderRouter = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

orderRouter.get('/', authMiddleware, orderController.getAll)
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
orderRouter.put('/status/:id', authMiddleware, orderController.changeStatus)
orderRouter.delete('/item/:itemId/:orderId', authMiddleware, orderController.deleteOneItem)
orderRouter.delete('/:id', authMiddleware, orderController.deleteOne)
orderRouter.post('/bulk-delete',
                 authMiddleware,
                 body('ids').isArray(),
                 orderController.deleteMany)

module.exports = orderRouter
