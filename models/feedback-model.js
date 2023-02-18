const { Schema, model } = require('mongoose')

const FeedbackSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
})

module.exports = model('Feedback', FeedbackSchema)
