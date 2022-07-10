import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: {
      client: 'pg',
      connection: Application.inProduction
        ? Env.get('DATABASE_URL') + '?ssl=no-verify'
        : {
            host: Env.get('PG_HOST'),
            port: Env.get('PG_PORT'),
            user: Env.get('PG_USER'),
            password: Env.get('PG_PASSWORD', ''),
            database: Env.get('PG_DB_NAME'),
          },
      migrations: {
        naturalSort: true,
        disableRollbacksInProduction: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
