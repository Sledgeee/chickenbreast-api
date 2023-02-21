const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: { type: String, required: true },
    servingSize: { type: Number, required: true },
    calories: { type: Number, required: true },
    caloriesFromFat: { type: Number, required: true },
    totalFat: { type: Number, required: true },
    saturatedFat: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    sodium: { type: Number, required: true },
    totalCarbohydates: { type: Number, required: true },
    dietaryFiber: { type: Number, required: true },
    sugars: { type: Number, required: true },
    protein: { type: Number, required: true },
    vitaminA: { type: Number, required: true },
    calcium: { type: Number, required: true },
    vitaminC: { type: Number, required: true },
    iron: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

module.exports = model('Product', ProductSchema)
