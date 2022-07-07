import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { IVehicle } from 'App/Types/Vehicle'

export default class VehiclesController {
  public async index(ctx: HttpContextContract) {
    const vehi = Database.from('vehicles').select('*')
    return vehi
  }
}
