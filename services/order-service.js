const OrderModel = require('../models/order-model')

class OrderService {
    async getAll() {
        return (await OrderModel.find({}))
    }

    async getOne(id) {
        return (await OrderModel.findById(id))
    }

    async createOne(body) {
        return (await OrderModel.create({ ...body, status: 'Опрацьовується' }))
    }
}

module.exports = new OrderService()
