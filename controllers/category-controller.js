const categoryService = require('../services/category-service')
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/api-error')

class CategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await categoryService.getAll()
            return res.json(categories)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const category = await categoryService.getOne(id)
            return res.json(category)
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
            const category = await categoryService.createOne(req.body)
            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { id } = req.params
            const result = await categoryService.deleteOne(id)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteMany(req, res, next) {
        try {
            const { ids } = req.body
            const result = await categoryService.deleteMany(ids)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()
