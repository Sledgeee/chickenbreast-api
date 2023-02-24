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

    async deleteOne(id) {
        return (await CategoryModel.deleteOne({ _id: id }))
    }

    async deleteMany(ids) {
        return (await CategoryModel.deleteMany({ _id: { $in: ids}}))
    }
}

module.exports = new CategoryService()
