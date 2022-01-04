import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // app.enableCors({});

  const port = app.get(ConfigService).get<string>('NODE_PORT', '3987');

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
