const recipeService = require('../services/recipe-service')
const {validationResult} = require("express-validator")
const ApiError = require('../exceptions/api-error')

class RecipeController {
    async getAll(req, res, next) {
        try {
            const orders = await recipeService.getAll()
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const order = await recipeService.getOne(id)
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }

    async createOne(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const order = await recipeService.createOne(req.body)
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RecipeController()
