const orderService = require('../services/order-service')
const mailService = require('../services/mail-service')
const {validationResult} = require("express-validator")
const ApiError = require('../exceptions/api-error')

class OrderController {
    async getAll(req, res, next) {
        try {
            const orders = await orderService.getAll()
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const order = await orderService.getOne(id)
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
            const order = await orderService.createOne(req.body)
            const { _id, items } = order
            await mailService.sendOrderCreatedMail(req.body.email, _id, items)
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()
