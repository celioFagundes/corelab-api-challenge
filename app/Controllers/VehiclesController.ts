import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async findAll({ request }) {
    const { keyword, color, brand, year, minValue, maxValue } = request.requestData
    const keywordIsNumber = parseInt(keyword) >= 0

    const query = Vehicle.query()
    color && query.andWhere('color', color)
    brand && query.andWhere('brand', brand)
    year && query.andWhere('year', year)
    minValue && query.andWhere('price', '>=', minValue)
    maxValue && query.andWhere('price', '<=', maxValue)

    if (keyword) {
      query.where((whereBuilder) => {
        whereBuilder
          .orWhereILike('name', `%${keyword}%`)
          .orWhereILike('description', `%${keyword}%`)
          .orWhereILike('brand', `%${keyword}%`)
          .orWhereILike('color', `%${keyword}%`)
          .orWhereILike('plate', `%${keyword}%`)
        if (keywordIsNumber) {
          whereBuilder.orWhere('year', parseInt(keyword)).orWhere('price', parseInt(keyword))
        }
      })
    }

    const vehicles = await query.exec()
    return vehicles
  }
  public async findById({ params }) {
    const vehicle = await Vehicle.findOrFail(params.id)
    return vehicle
  }
  public async create({ request }) {
    const body = request.requestData
    const vehicle = await Vehicle.create({ ...body })
    return vehicle
  }
  public async update({ request, params }) {
    const body = request.requestData
    const vehicle = await Vehicle.findOrFail(params.id)
    await vehicle.merge({ ...body }).save()
    return vehicle
  }
  public async delete({ params }) {
    const vehicle = await Vehicle.findOrFail(params.id)
    await vehicle.delete()
  }
  public async toggleIsFavorite({ params }) {
    const vehicle = await Vehicle.findOrFail(params.id)
    await vehicle.merge({ is_favorite: !vehicle.is_favorite }).save()
    return vehicle
  }
  public async createMany({ request }) {
    const body = request.requestData
    const vehicle = await Vehicle.createMany([...body.data])
    return vehicle
  }
}
