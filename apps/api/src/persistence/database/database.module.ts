import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RepositoryProvider } from '../repositories/repository.provider';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [DatabaseModule],
  // TODO Should the repositories have their own module?
  providers: [ConfigService, DatabaseProvider, RepositoryProvider],
  exports: [],
})
export class DatabaseModule {}
