import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configServiceFactory } from '../config/config.service';
import { DomainServicesModule } from '../domain/services/domain-services.module';
import { TermService } from '../domain/services/term.service';
import { VocabularyListService } from '../domain/services/vocabulary-list.service';
import { DatabaseProvider } from '../persistence/database/database.provider';
import { RepositoryProvider } from '../persistence/repositories/repository.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TermController } from './controllers/term.controller';
import { VocabularyListController } from './controllers/vocabulary-list.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configServiceFactory],
    }),
    DomainServicesModule,
  ],
  controllers: [AppController, TermController, VocabularyListController],
  providers: [
    AppService,
    TermService,
    VocabularyListService,
    DatabaseProvider,
    RepositoryProvider,
  ],
})
export class AppModule {}
