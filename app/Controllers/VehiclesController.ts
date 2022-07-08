import Vehicle from 'App/Models/Vehicle'
import { IVehicle } from 'App/Types/Vehicle'

export default class VehiclesController {
  public async findAll({ request }) {
    const { keyword, color, brand, year, minValue, maxValue } = request.requestData
    const query = Vehicle.query()
    const keywordIsNumber = parseInt(keyword) >= 0
    if (keyword) {
      query
        .orWhereILike('name', keyword)
        .orWhereILike('description', `%${keyword}%`)
        .orWhereILike('brand', keyword)
        .orWhereILike('color', keyword)
        .orWhereILike('plate', keyword)
      if (keywordIsNumber) {
        query.orWhere('year', parseInt(keyword)).orWhere('price', parseInt(keyword))
      }
    }
    const vehicles = await query.exec()
    let filterVehicles = vehicles
    filterVehicles = this.filterBy(filterVehicles, 'color', color)
    filterVehicles = this.filterBy(filterVehicles, 'brand', brand)
    filterVehicles = this.filterBy(filterVehicles, 'year', parseInt(year))
    filterVehicles = this.filterByPrice(filterVehicles, parseInt(minValue), parseInt(maxValue))
    return filterVehicles
  }
  filterBy = (list: Vehicle[], param: string, value: string | number) => {
    if (value) {
      const newList = list.filter((item) => item[param] === value)
      return newList
    }
    return list
  }
  filterByPrice = (list: Vehicle[], min: number, max: number) => {
    if (min && !max) {
      return list.filter((item) => item.price >= min)
    }
    if (max && !min) {
      return list.filter((item) => item.price <= max)
    }
    if (min && max) {
      return list.filter((item) => item.price >= min && item.price <= max)
    }
    return list
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
    await vehicle.merge({ is_favorite: !vehicle.is_favorite }).save()
    return vehicle
  }
}
