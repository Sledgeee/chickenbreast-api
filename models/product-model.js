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
    dietaryFiber: { type: Number, rqeuired: true },
    sugars: { type: Number, rqeuired: true },
    protein: { type: Number, rqeuired: true },
    vitaminA: { type: Number, rqeuired: true },
    calcium: { type: Number, rqeuired: true },
    vitaminC: { type: Number, rqeuired: true },
    iron: { type: Number, rqeuired: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

module.exports = model('Product', ProductSchema)
