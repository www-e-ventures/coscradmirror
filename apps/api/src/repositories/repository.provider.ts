import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';

@Injectable()
export class RepositoryProvider {
  constructor(private databaseProvier: DatabaseProvider) {}
}
