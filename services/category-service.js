const CategoryModel = require('../models/category-model')

class CategoryService {
    async getAll() {
        return (await CategoryModel.find({}))
    }

    async getOne(id) {
        return (await CategoryModel.findById(id))
    }

    async createOne(body) {
        return (await CategoryModel.create(body))
    }
}

module.exports = new CategoryService()
