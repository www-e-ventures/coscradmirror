import { Inject } from '@nestjs/common';
import {
    CommandInfo,
    CommandInfoService,
} from '../../../app/controllers/command/services/command-info-service';
import { RepositoryProvider } from '../../../persistence/repositories/repository.provider';
import { BibliographicReferenceViewModel } from '../../../view-models/buildViewModelForResource/viewModels/bibliographic-reference/bibliographic-reference.view-model';
import { IBibliographicReference } from '../../models/bibliographic-reference/interfaces/IBibliographicReference';
import { IBibliographicReferenceData } from '../../models/bibliographic-reference/interfaces/IBibliographicReferenceData';
import { ResourceType } from '../../types/ResourceType';
import { BaseQueryService } from './base-query.service';

export class BibliographicReferenceQueryService extends BaseQueryService<
    IBibliographicReference,
    BibliographicReferenceViewModel
> {
    constructor(
        @Inject(RepositoryProvider) repositoryProvider: RepositoryProvider,
        @Inject(CommandInfoService) commandInfoService: CommandInfoService
    ) {
        super(ResourceType.bibliographicReference, repositoryProvider, commandInfoService);
    }

    buildViewModel(
        bibliographicReferenceInstance: IBibliographicReference<IBibliographicReferenceData>
    ): BibliographicReferenceViewModel {
        return new BibliographicReferenceViewModel(bibliographicReferenceInstance);
    }

    getInfoForIndexScopedCommands(): CommandInfo[] {
        return [];
        // TODO Get available index scoped commands from Ctors
        // return [BookBibliographicReference, JournalArticleBibliographicReference].flatMap((Ctor) =>
        //     this.commandInfoService.getCommandInfo(Ctor)
        // );
    }
}