import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async findAll({ request }) {
    const { keyword } = request.requestData
    const query = Vehicle.query()
    const keywordIsNumber = parseInt(keyword) >= 0
    if (keyword) {
      query
        .whereILike('name', keyword)
        .orWhereILike('description', `%${keyword}%`)
        .orWhereILike('brand', keyword)
        .orWhereILike('color', keyword)
        .orWhereILike('plate', keyword)
      if (keywordIsNumber) {
        query.orWhere('year', parseInt(keyword)).orWhere('price', parseInt(keyword))
      }
    }
    const vehicles = await query
    return vehicles
  }
  public async findFilter({ request }) {
    const { brand, color, year, minPrice, maxPrice } = request.requestData
    const query = Vehicle.query()
    if (brand) {
      query.where('brand', brand)
    }
    if (color) {
      query.where('color', color)
    }
    if (year) {
      query.where('year', year)
    }
    if (minPrice && !maxPrice) {
      query.where('price', '>=', minPrice)
    }
    if (maxPrice && !minPrice) {
      query.where('price', '<=', maxPrice)
    }
    if (minPrice && maxPrice) {
      query.whereBetween('price', [minPrice, maxPrice])
    }
    const vehicles = await query
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
  }
  public async delete({ params }) {
    const vehicle = await Vehicle.findOrFail(params.id)
    await vehicle.delete()
  }
  public async toggleIsFavorite({ params }) {
    const vehicle = await Vehicle.findOrFail(params.id)
    await vehicle.merge({ isFavorite: !vehicle.isFavorite }).save()
  }
}
