const { Schema, model } = require('mongoose')

const LoginAttemptSchema = new Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    otp: { type: Number, required: true },
    isMagic: { type: Boolean, required: true }
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false })

module.exports = model('LoginAttempt', LoginAttemptSchema)
