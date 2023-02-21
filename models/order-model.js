const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    productsQuantity: { type: Number, required: true },
    moneyAmount: { type: Number, required: true },
    address: { type: String, required: true },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = model('Order', OrderSchema)
