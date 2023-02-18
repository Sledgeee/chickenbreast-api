const { Schema, model } = require('mongoose')

const RecipeSchema = new Schema({
    name: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true },
    ingridients: [{ type: String, required: true }],
    instruction: { type: String, requried: true }
})

module.exports = model('Recipe', RecipeSchema)
