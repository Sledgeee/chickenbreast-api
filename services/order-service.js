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
        return (await OrderModel.updateOne({ _id: id }, { $set: { status: 'Скасоване' } }))
    }

    async deleteOneItem(itemId, orderId) {
        const order = await OrderModel.findById(orderId)
        order.items.pull({ _id: itemId })
        order.productsQuantity = 0
        order.moneyAmount = 0
        order.items.forEach(value => {
            order.productsQuantity += value.quantity
            order.moneyAmount += value.totalSum
        })
        return await order.save()
    }

    async deleteOne(id) {
        return (await OrderModel.deleteOne({ _id: id }))
    }

    async deleteMany(ids) {
        return (await OrderModel.deleteMany({ _id: { $in: ids}}))
    }
}

module.exports = new OrderService()
