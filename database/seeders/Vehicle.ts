import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Vehicle from 'App/Models/Vehicle'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await Vehicle.createMany([
      {
        name: 'Carro 1',
        description: 'primeiro',
        brand: 'Marca 1',
        plate: 'UUU1U11',
        price: 10000,
        year: 2010,
        color: 'Preto',
        createdAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
        updatedAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
      },
      {
        name: 'Carro 2',
        description: 'segundo',
        brand: 'Marca 2',
        plate: 'PPP1P11',
        price: 20000,
        year: 2011,
        color: 'Branco',
        createdAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
        updatedAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
      },
      {
        name: 'Carro 3',
        description: 'terceiro',
        brand: 'Marca 3',
        plate: 'RRR1R11',
        price: 30000,
        year: 2012,
        color: 'Vermelho',
        createdAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
        updatedAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
      },
    ])
  }
}
