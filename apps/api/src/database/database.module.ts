import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ConfigService, DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
