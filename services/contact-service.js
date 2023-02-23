const FeedbackModel = require('../models/feedback-model')

class ContactService {
    async createFeedback(body) {
        return (await FeedbackModel.create(body))
    }

    async getFeedbacks() {
        return (await FeedbackModel.find({}))
    }

    async deleteOneFeedback(id) {
        return (await FeedbackModel.deleteOne({ _id: id }))
    }

    async deleteManyFeedbacks(ids) {
        return (await FeedbackModel.deleteMany({ id: { $in: { ids } } }))
    }
}

module.exports = new ContactService()
