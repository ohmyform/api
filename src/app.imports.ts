import { MailerModule } from '@nestjs-modules/mailer'
import { HttpModule, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import crypto from 'crypto'
import { Request } from 'express-serve-static-core'
import { IncomingHttpHeaders } from 'http'
import { ConsoleModule } from 'nestjs-console'
import { LoggerModule, Params as LoggerModuleParams } from 'nestjs-pino/dist'
import { join } from 'path'
import { entities } from './entity'

export const LoggerConfig: LoggerModuleParams = {
  pinoHttp: {
    level: process.env.CLI ? 'warn' : process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    prettyPrint: process.env.NODE_ENV !== 'production' || process.env.CLI  ? {
      translateTime: true,
      colorize: true,
      ignore: 'pid,hostname,req,res',
    } : false,
  },
  exclude: [
    {
      method: RequestMethod.ALL,
      path: '_health',
    },
    {
      method: RequestMethod.ALL,
      path: 'favicon.ico',
    }
  ],
}

export const imports = [
  ConsoleModule,
  HttpModule.register({
    timeout: 5000,
    maxRedirects: 10,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    exclude: [

    ]
  }),
  ConfigModule.forRoot({
    load: [
      () => {
        return {
          LOCALES_PATH: join(process.cwd(), 'locales'),
          SECRET_KEY: process.env.SECRET_KEY || crypto.randomBytes(20).toString('hex'),
        }
      }
    ],
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: {
        expiresIn: '4h',
      },
    })
  }),
  LoggerModule.forRoot(LoggerConfig),
  GraphQLModule.forRoot({
    debug: process.env.NODE_ENV !== 'production',
    definitions: {
      outputAs: 'class',
    },
    introspection: true,
    playground: true,
    installSubscriptionHandlers: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // to allow guards on resolver props https://github.com/nestjs/graphql/issues/295
    fieldResolverEnhancers: [
      'guards',
      'interceptors',
    ],
    resolverValidationOptions: {

    },
    context: ({ req, connection }) => {
      if (!req && connection) {
        const headers: IncomingHttpHeaders = {}

        Object.keys(connection.context).forEach(key => {
          headers[key.toLowerCase()] = connection.context[key]
        })

        return {
          req: {
            headers
          } as Request
        }
      }

      return { req }
    },
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        name: 'ohmyform',
        synchronize: false,
        type: configService.get<string>('DB_TYPE', 'sqlite') as any,
        url: configService.get<string>('DB_URI', 'sqlite://data.sqlite'),
        entityPrefix: configService.get<string>('DB_TABLE_PREFIX', ''),
        logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
        entities,
        migrations: [
          `${__dirname}/**/migrations/**/*{.ts,.js}`,
        ],
        migrationsRun: configService.get<boolean>('DB_MIGRATE', true),
      }),
  }),
  TypeOrmModule.forFeature(entities),
  MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: configService.get<string>('MAILER_URI', 'smtp://localhost:1025'),
      defaults: {
        from: configService.get<string>('MAILER_FROM', 'OhMyForm <no-reply@localhost>'),
      },
    }),
  }),
]
