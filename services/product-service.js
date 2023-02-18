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
}

module.exports = new ProductService()
