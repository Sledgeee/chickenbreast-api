const Router = require('express').Router
const productController = require('../controllers/product-controller')
const productRouter = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getOne)
productRouter.post('/',
                   authMiddleware,
                   body('name').notEmpty(),
                   body('servingSize').notEmpty().isNumeric(),
                   body('calories').notEmpty().isNumeric(),
                   body('caloriesFromFat').notEmpty().isNumeric(),
                   body('totalFat').notEmpty().isNumeric(),
                   body('saturatedFat').notEmpty().isNumeric(),
                   body('cholesterol').notEmpty().isNumeric(),
                   body('sodium').notEmpty().isNumeric(),
                   body('totalCarbohydates').notEmpty().isNumeric(),
                   body('dietaryFiber').notEmpty().isNumeric(),
                   body('sugars').notEmpty().isNumeric(),
                   body('protein').notEmpty().isNumeric(),
                   body('vitaminA').notEmpty().isNumeric(),
                   body('calcium').notEmpty().isNumeric(),
                   body('vitaminC').notEmpty().isNumeric(),
                   body('iron').notEmpty().isNumeric(),
                   body('price').notEmpty().isNumeric(),
                   body('image').notEmpty(),
                   body('category').notEmpty(),
                   productController.createOne)
productRouter.put('/:id', authMiddleware, productController.updateOne)
productRouter.delete('/:id', authMiddleware, productController.deleteOne)
productRouter.post('/bulk-delete',
                   authMiddleware,
                   body('ids').isArray(),
                   productController.deleteMany)

module.exports = productRouter
