import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { DateTime } from 'luxon'

test.group('Group name', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('pg')
    return () => Database.rollbackGlobalTransaction()
  })

  test('find all vehicles', async ({ client }) => {
    const response = await client.get('/vehicles')
    response.assertStatus(200)
    response.assertBodyContains([
      {
        id: 1,
        name: 'Carro 1',
        description: 'primeiro',
        brand: 'Marca 1',
        plate: 'UUU1U11',
        is_favorite: false,
        price: 10000,
        year: 2010,
        color: 'Preto',
        created_at: '2022-07-01T01:01:01.001-03:00',
        updated_at: '2022-07-01T01:01:01.001-03:00',
      },
      {
        id: 2,
        name: 'Carro 2',
        description: 'segundo',
        brand: 'Marca 2',
        plate: 'PPP1P11',
        is_favorite: false,
        price: 20000,
        year: 2011,
        color: 'Branco',
        created_at: '2022-07-01T01:01:01.001-03:00',
        updated_at: '2022-07-01T01:01:01.001-03:00',
      },
      {
        id: 3,
        name: 'Carro 3',
        brand: 'Marca 3',
        description: 'terceiro',
        plate: 'RRR1R11',
        is_favorite: false,
        price: 30000,
        year: 2012,
        color: 'Vermelho',
        created_at: '2022-07-01T01:01:01.001-03:00',
        updated_at: '2022-07-01T01:01:01.001-03:00',
      },
    ])
  })
  test('find all vehicles by keyword', async ({ client }) => {
    const response = await client.get('/vehicles/?keyword=primeiro')
    response.assertStatus(200)
    response.assertBody([
      {
        id: 1,
        name: 'Carro 1',
        description: 'primeiro',
        brand: 'Marca 1',
        plate: 'UUU1U11',
        is_favorite: false,
        price: 10000,
        year: 2010,
        color: 'Preto',
        created_at: '2022-07-01T01:01:01.001-03:00',
        updated_at: '2022-07-01T01:01:01.001-03:00',
      },
    ])
  })
  test('find all vehicles by color', async ({ client }) => {
    const response = await client.get('/vehicles/?color=Preto')
    response.assertStatus(200)
    response.assertBody([
      {
        id: 1,
        name: 'Carro 1',
        description: 'primeiro',
        brand: 'Marca 1',
        plate: 'UUU1U11',
        is_favorite: false,
        price: 10000,
        year: 2010,
        color: 'Preto',
        created_at: '2022-07-01T01:01:01.001-03:00',
        updated_at: '2022-07-01T01:01:01.001-03:00',
      },
    ])
  })

  test('find vehicles by id', async ({ client }) => {
    const response = await client.get('/vehicles/1')
    response.assertStatus(200)
    response.assertBody({
      id: 1,
      name: 'Carro 1',
      description: 'primeiro',
      brand: 'Marca 1',
      plate: 'UUU1U11',
      price: 10000,
      is_favorite: false,
      year: 2010,
      color: 'Preto',
      created_at: '2022-07-01T01:01:01.001-03:00',
      updated_at: '2022-07-01T01:01:01.001-03:00',
    })
  })
  test('create vehicle', async ({ client }) => {
    const response = await client.post('/vehicles/').json({
      name: 'Carro 4',
      description: 'Quarto',
      brand: 'Marca 4',
      plate: 'UUU1U11',
      price: 40000,
      year: 2013,
      color: 'Azul',
      createdAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
      updatedAt: DateTime.local(2022, 7, 1, 1, 1, 1, 1),
    })
    response.assertStatus(200)
    response.assertBody({
      name: 'Carro 4',
      description: 'Quarto',
      brand: 'Marca 4',
      plate: 'UUU1U11',
      price: 40000,
      year: 2013,
      color: 'Azul',
      created_at: '2022-07-01T01:01:01.001-03:00',
      updated_at: '2022-07-01T01:01:01.001-03:00',
      id: 4,
    })
  })
  test('update vehicle', async ({ client }) => {
    const response = await client.put('/vehicles/3').json({
      name: 'Carro 5',
      description: 'Quarto',
      brand: 'Marca 5',
      plate: 'UUU1U11',
      price: 50000,
      year: 2014,
      color: 'Vermelho',
    })
    response.assertStatus(200)
    response.assertBodyContains({
      id: 3,
      name: 'Carro 5',
      description: 'Quarto',
      brand: 'Marca 5',
      plate: 'UUU1U11',
      is_favorite: false,
      year: 2014,
      color: 'Vermelho',
      price: 50000,
      created_at: '2022-07-01T01:01:01.001-03:00',
    })
  })

  test('delete vehicle', async ({ client }) => {
    const response = await client.delete('/vehicles/1')
    response.assertStatus(200)
  })
  test('update vehicle is favorite', async ({ client }) => {
    const response = await client.post('/vehicles/favorite/3')
    response.assertStatus(200)
    response.assertBodyContains({
      id: 3,
      name: 'Carro 3',
      description: 'terceiro',
      brand: 'Marca 3',
      plate: 'RRR1R11',
      is_favorite: true,
      year: 2012,
      color: 'Vermelho',
      price: 30000,
      created_at: '2022-07-01T01:01:01.001-03:00',
    })
  })
})
