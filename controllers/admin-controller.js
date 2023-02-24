const adminService = require('../services/admin-service')
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class AdminController {
    async getAll(req, res, next) {
        try {
            const admins = await adminService.getAll()
            return res.send(admins)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const admin = await adminService.getOne(id)
            return res.send(admin)
        } catch (e) {
            next(e)
        }
    }

    async deleteOne(req, res, next) {
        try {
            if (req.admin.role !== "Super") {
                return next(ApiError.PermissionDenied())
            }
            const { id } = req.params
            const result = await adminService.deleteOne(id)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteMany(req, res, next) {
        try {
            if (req.admin.role !== "Super") {
                return next(ApiError.PermissionDenied())
            }
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { ids } = req.body
            const result = await adminService.deleteMany(ids)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()
