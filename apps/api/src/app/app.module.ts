import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configServiceFactory } from '../config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configServiceFactory],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
