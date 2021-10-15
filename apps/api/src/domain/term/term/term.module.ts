import { Module } from '@nestjs/common';
import { DatabaseModule } from 'apps/api/src/database/database.module';
import { TermController } from './term.controller';
import { TermService } from './term.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TermController],
  providers: [TermService],
})
export class TermModule {}
