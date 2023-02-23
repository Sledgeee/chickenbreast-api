const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: { type: String, required: true }
}, {
    versionKey: false
})

module.exports = model('Category', CategorySchema)
