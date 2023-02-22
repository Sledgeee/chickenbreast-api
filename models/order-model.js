const { Schema, model } = require('mongoose')
const {ObjectId} = require("mongodb");

const OrderSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    productsQuantity: { type: Number, required: true },
    moneyAmount: { type: Number, required: true },
    items: [{
        product: {
            _id: { type: ObjectId, required: true },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true }
        },
        quantity: { type: Number, required: true },
        totalSum: { type: Number, required: true }
    }],
    status: { type: String, enum: ['Створене', 'Оброблене менеджером', 'Виконане', 'Відмінене'], default: 'Створене' }
}, { timestamps: true })

module.exports = model('Order', OrderSchema)
