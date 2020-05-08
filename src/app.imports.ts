import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import crypto from 'crypto';
import { ConsoleModule } from 'nestjs-console';
import { LoggerModule, Params as LoggerModuleParams } from 'nestjs-pino/dist';
import { join } from 'path';
import { ContextCache } from './resolver/context.cache';
import { schema } from './schema';

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
  ConfigModule.forRoot({
    load: [
      () => {
        return {
          LOCALES_PATH: join(process.cwd(), 'locales'),
          AUTH_SECRET: process.env.AUTH_SECRET || crypto.randomBytes(20).toString('hex'),
        }
      }
    ],
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
      secret: configService.get<string>('AUTH_SECRET'),
      signOptions: {
        expiresIn: '4h',
      },
    })
  }),
  LoggerModule.forRoot(LoggerConfig),
  GraphQLFederationModule.forRoot({
    debug: process.env.NODE_ENV !== 'production',
    definitions: {
      outputAs: 'class',
    },
    introspection: true,
    playground: true,
    // installSubscriptionHandlers: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // to allow guards on resolver props https://github.com/nestjs/graphql/issues/295
    fieldResolverEnhancers: [
      'guards',
      'interceptors',
    ],
    resolverValidationOptions: {

    },
    context: ({ req }) => {
      return {
        cache: new ContextCache(),
        req,
      }
    },
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
      uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost/ohmyform'),
      // takes care of deprecations from https://mongoosejs.com/docs/deprecations.html
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  }),
  MongooseModule.forFeature(schema),
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
