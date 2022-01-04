import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RepositoryProvider } from '../repositories/repository.provider';
import { ArangoConnectionProvider } from './arango-connection.provider';
import { DatabaseProvider } from './database.provider';

@Global()
@Module({
  imports: [DatabaseModule],
  // TODO Should the repositories have their own module?
  providers: [
    ConfigService,
    DatabaseProvider,
    RepositoryProvider,
    ArangoConnectionProvider,
  ],
  exports: [ArangoConnectionProvider],
})
export class DatabaseModule {}
