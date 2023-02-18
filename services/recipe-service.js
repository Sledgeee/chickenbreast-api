const RecipeModel = require('../models/recipe-model')

class RecipeService {
    async getAll() {
        return (await RecipeModel.find({}))
    }

    async getOne(id) {
        return (await RecipeModel.findById(id))
    }

    async createOne(body) {
        return (await RecipeModel.create(body))
    }
}

module.exports = new RecipeService()
