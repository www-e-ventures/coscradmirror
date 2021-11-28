import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../database/database.provider';

/**
 * TODO Use a provider for our repositories. This will allow us to
 * swap out the implemntation of all repositories in one go. For exmaple,
 * we may want to use an in-memory repository for tests or development.
 */
@Injectable()
export class RepositoryProvider {
  constructor(private databaseProvier: DatabaseProvider) {}
}
