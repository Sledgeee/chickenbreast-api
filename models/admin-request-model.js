const { Schema, model } = require('mongoose')

const AdminRequestSchema = new Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true }
}, {
    versionKey: false
})

module.exports = model('AdminRequest', AdminRequestSchema)
