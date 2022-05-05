import { Injectable, NotImplementedException } from '@nestjs/common';
import { Book } from '../../domain/models/book/entities/book.entity';
import { InMemorySnapshot, ResourceType } from '../../domain/types/resourceTypes';
import { InternalError, isInternalError } from '../../lib/errors/InternalError';
import { Maybe } from '../../lib/types/maybe';
import { isNotFound, NotFound } from '../../lib/types/not-found';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { ViewModelId } from '../buildViewModelForResource/viewModels';
import { BaseViewModel } from '../buildViewModelForResource/viewModels/base.view-model';
import { BookViewModel } from '../buildViewModelForResource/viewModels/book.view-model';

@Injectable()
export class ViewModelQueryService {
    constructor(
        private repositoryProvider: RepositoryProvider,
        private resourceType: ResourceType
    ) {}

    async fetchMany(): Promise<InternalError[] | BaseViewModel[]> {
        const result = await this.repositoryProvider.forResource(this.resourceType).fetchMany();

        const allErrors = result.filter(isInternalError);

        if (allErrors.length > 0) return allErrors;
    }

    async fetchById(id: ViewModelId): Promise<InternalError | Maybe<BookViewModel>> {
        const result = await this.repositoryProvider
            .forResource<Book>(this.resourceType)
            .fetchById(id);

        if (isNotFound(result)) return NotFound;

        if (isInternalError(result)) return result;

        const externalState = await this.fetchRequiredState();

        // Not quite general enough, as there can be other dependencies- e.g. config
        const viewModel = this.buildViewModel(result, externalState);

        return viewModel;
    }

    protected buildViewModel(domainModel: Book, _: InMemorySnapshot): BookViewModel {
        return new BookViewModel(domainModel);
    }

    protected buildViewModels(requiredState: InMemorySnapshot) {}

    protected async fetchRequiredState(): Promise<InMemorySnapshot> {
        throw new NotImplementedException();
    }
}
