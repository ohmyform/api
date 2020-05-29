import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { Logger, PinoLogger } from 'nestjs-pino/dist';
import { LoggerConfig } from './app.imports';
import { AppModule } from './app.module';

(async () => {
  const options: NestApplicationOptions =  {
    logger: new Logger(new PinoLogger(LoggerConfig), {}),
  }

  const app = await NestFactory.create(AppModule, options)
  app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
  }))
  app.enableCors({origin: '*'})
  app.getHttpAdapter().options('*', cors())

  await app.listen(process.env.PORT || 4100);
})()
