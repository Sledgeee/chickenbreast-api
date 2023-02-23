const contactService = require('../services/contact-service')
const {validationResult} = require("express-validator")
const ApiError = require('../exceptions/api-error')

class ContactController {
    async createFeedback(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const feedback = await contactService.createFeedback(req.body)
            return res.send(feedback)
        } catch (e) {
            next(e)
        }
    }

    async getFeedbacks(req, res, next) {
        try {
            const feedbacks = await contactService.getFeedbacks()
            return res.send(feedbacks)
        } catch (e) {
            next(e)
        }
    }

    async deleteOneFeedback(req, res, next) {
        try {
            const { id } = req.params
            const result = await contactService.deleteOneFeedback(id)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteManyFeedbacks(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const { ids } = req.body
            const result = await contactService.deleteManyFeedbacks(ids)
            return res.send(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ContactController()
