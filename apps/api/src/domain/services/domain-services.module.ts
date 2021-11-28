import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../persistence/database/database.module';
import { TermService } from './term.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [TermService],
})
export class DomainServicesModule {}
