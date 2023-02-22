const DepartmentModel = require('../models/department-model')

class DepartmentService {
    async getAll() {
        return (await DepartmentModel.find({}))
    }

    async getOne(id) {
        return (await DepartmentModel.findById(id))
    }

    async createOne(body) {
        return (await DepartmentModel.create(body))
    }

    async updateOne(id, values) {
        return (await DepartmentModel.updateOne({ '_id': id }, { $push: { addresses: values } }))
    }
}

module.exports = new DepartmentService()
