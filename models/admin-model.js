const { Schema, model } = require('mongoose')

const AdminSchema = new Schema({
    userId: { type: Number, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    role: { type: String, enum: ['Manager', 'Super'], default: 'Manager' }
})

module.exports = model('Admin', AdminSchema)
