import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Vehicle extends BaseModel {
  public static connection = 'pg'
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public brand: string

  @column()
  public plate: string

  @column()
  public year: number

  @column()
  public price: number

  @column()
  public color: string

  @column()
  public is_favorite: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
