const productService = require('../services/product-service')
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/api-error')

class ProductController {
    async getAll(req, res, next) {
        try {
            const products = await productService.getAll()
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await productService.getOne(id)
            return res.json(product)
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
            const product = await productService.createOne(req.body)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await productService.updateOne(id, req.body)
            return res.send(product)
        } catch (e) {
            next(e)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const result = await productService.deleteOne(id)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteMany(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { ids } = req.body
            const result = await productService.deleteMany(ids)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()
