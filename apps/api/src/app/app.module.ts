import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configServiceFactory } from '../config/config.service';
import { DomainServicesModule } from '../domain/services/domain-services.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TermController } from './controllers/term.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configServiceFactory],
    }),
    DomainServicesModule,
  ],
  controllers: [AppController, TermController],
  providers: [AppService],
})
export class AppModule {}
