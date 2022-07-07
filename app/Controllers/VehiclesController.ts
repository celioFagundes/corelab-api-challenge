import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
  public async findAll(ctx: HttpContextContract) {
    const vehicles = await Vehicle.all()
    return vehicles
  }
  public async findById({ params }) {
    const vehicle = await Vehicle.find(params.id)
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
}
