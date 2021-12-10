import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from '../authorization/authorization.module';
import { ConfigService, configServiceFactory } from '../config/config.service';
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
    AuthorizationModule,
    ConfigModule.forRoot({
      load: [configServiceFactory],
      isGlobal: true,
      ignoreEnvFile: true,
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
    ConfigService
  ],
})
export class AppModule {}
