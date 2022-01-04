import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DomainServicesModule } from '../domain/services/domain-services.module';
import { DatabaseProvider } from '../persistence/database/database.provider';
import { RepositoryProvider } from '../persistence/repositories/repository.provider';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddTagController } from './controllers/addTag.controller';
import { EntityViewModelController } from './controllers/entityViewModel.controller';

@Module({
  imports: [
    AuthorizationModule,
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
  controllers: [AppController, EntityViewModelController, AddTagController],
  providers: [AppService, DatabaseProvider, RepositoryProvider],
})
export class AppModule {}
