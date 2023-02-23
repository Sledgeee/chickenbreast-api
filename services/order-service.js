const OrderModel = require('../models/order-model')

class OrderService {
    async getAll() {
        return (await OrderModel.find({}))
    }

    async getOne(id) {
        return (await OrderModel.findById(id))
    }

    async createOne(body) {
        return (await OrderModel.create(body))
    }

    async cancelOne(id) {
        return (await OrderModel.updateOne({ _id: id }, { $set: { status: 'Відмінене' } }))
    }

    async deleteOne(id) {
        return (await OrderModel.deleteOne({ _id: id }))
    }

    async deleteMany(ids) {
        return (await OrderModel.deleteMany({ id: { $in: { ids } } }))
    }
}

module.exports = new OrderService()
