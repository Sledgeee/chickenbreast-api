const ProductModel = require('../models/product-model')

class ProductService {
    async getAll() {
        return (await ProductModel.find({}).populate('category'))
    }

    async getOne(id) {
        return (await ProductModel.findById(id))
    }

    async createOne(body) {
        return (await ProductModel.create(body))        
    }

    async updateOne(id, body) {
        return (await ProductModel.updateOne({ _id: id }, { ...body }))
    }

    async deleteOne(id) {
        return (await ProductModel.deleteOne({ _id: id }))
    }

    async deleteMany(ids) {
        return (await ProductModel.deleteMany({ _id: { $in: ids}}))
    }
}

module.exports = new ProductService()
