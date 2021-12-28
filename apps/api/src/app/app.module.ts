import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DomainServicesModule } from '../domain/services/domain-services.module';
import { TermService } from '../domain/services/term.service';
import { VocabularyListService } from '../domain/services/vocabulary-list.service';
import { DatabaseProvider } from '../persistence/database/database.provider';
import { RepositoryProvider } from '../persistence/repositories/repository.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntityViewModelController } from './controllers/entityViewModel.controller';
import { TermController } from './controllers/term.controller';
import { VocabularyListController } from './controllers/vocabulary-list.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      cache: false,
    }),
    DomainServicesModule,
    ServeStaticModule.forRoot({
      // TODO get this from the config
      rootPath: join(__dirname, '.', 'public'),
    }),
  ],
  controllers: [
    AppController,
    TermController,
    VocabularyListController,
    EntityViewModelController,
  ],
  providers: [
    AppService,
    TermService,
    VocabularyListService,
    DatabaseProvider,
    RepositoryProvider,
  ],
})
export class AppModule {}
