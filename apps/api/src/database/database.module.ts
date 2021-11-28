import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ConfigService],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
