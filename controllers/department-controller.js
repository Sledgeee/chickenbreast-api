const departmentService = require('../services/department-service')
const {validationResult} = require("express-validator")
const ApiError = require('../exceptions/api-error')

class DepartmentController {
    async getAll(req, res, next) {
        try {
            const orders = await departmentService.getAll()
            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const order = await departmentService.getOne(id)
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
            const order = await departmentService.createOne(req.body)
            return res.json(order)
        } catch (e) {
            next(e)
        }
    }

    async updateOne(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { id } = req.params
            const { addresses } = req.body
            const department = await departmentService.updateOne(id, addresses)
            return res.json(department)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DepartmentController()
