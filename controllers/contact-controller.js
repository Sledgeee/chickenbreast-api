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
}

module.exports = new ContactController()
