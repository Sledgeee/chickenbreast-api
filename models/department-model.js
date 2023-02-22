const { Schema, model } = require('mongoose')

const DepartmentSchema = new Schema({
    city: { type: String, required: true },
    addresses: [{
        type: String,
        required: true
    }]
})

module.exports = model('Department', DepartmentSchema)
