import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../../persistence/database/database.module';
import { DatabaseProvider } from '../../persistence/database/database.provider';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { TermService } from './term.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [TermService, DatabaseProvider, RepositoryProvider, ConfigService],
})
export class DomainServicesModule {}
