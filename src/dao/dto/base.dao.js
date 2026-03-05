export class BaseDAO {
    constructor(model) {this.model = model}

    async create(dto) {return await this.model.create(dto)}
    async findById(dto) {return await this.model.findById(dto).lean()}
    async findOne(dto = {}) {return await this.model.findOne(dto).lean()}
    async find(dto = {}, options = {}) {
        const query = this.model.find(dto)
        if (options.sort) query.sort(options.sort)
        if (options.limit) query.limit(options.limit)
        if (options.skip) query.skip(options.skip)
        if (options.select) query.select(options.select)
        return await query.lean()
    }
    async findByIdAndUpdate(dto) {
        return await this.model.findByIdAndUpdate(dto.id, dto.data, {
            new:true,
            runValidators: true
        }).lean()
    }
    async findByIdAndDelete (dto) {return await this.model.findByIdAndDelete(dto).lean()}
    async countDocuments(dto = {}) {return await this.model.countDocuments(dto)}
}