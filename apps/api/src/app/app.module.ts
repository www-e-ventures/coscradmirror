import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configServiceFactory } from '../config/config.service';
import { TermModule } from '../domain/term/term/term.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configServiceFactory],
    }),
    TermModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
