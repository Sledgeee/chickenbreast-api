const FeedbackModel = require('../models/feedback-model')

class ContactService {
    async createFeedback(body) {
        return (await FeedbackModel.create(body))
    }

    async getFeedbacks() {
        return (await FeedbackModel.find({}))
    }
}

module.exports = new ContactService()
