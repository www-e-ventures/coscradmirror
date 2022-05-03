import { Controller, Get, Param, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Book } from '../../domain/models/book/entities/book.entity';
import { Photograph } from '../../domain/models/photograph/entities/photograph.entity';
import { ISpatialFeature } from '../../domain/models/spatial-feature/ISpatialFeature';
import { Term } from '../../domain/models/term/entities/term.entity';
import { TranscribedAudio } from '../../domain/models/transcribed-audio/entities/transcribed-audio.entity';
import { VocabularyList } from '../../domain/models/vocabulary-list/entities/vocabulary-list.entity';
import { isResourceId } from '../../domain/types/ResourceId';
import { resourceTypes } from '../../domain/types/resourceTypes';
import { isInternalError } from '../../lib/errors/InternalError';
import { isNotFound } from '../../lib/types/not-found';
import cloneToPlainObject from '../../lib/utilities/cloneToPlainObject';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import buildBookViewModels from '../../view-models/buildViewModelForResource/viewModelBuilders/buildBookViewModels';
import buildPhotographViewModels from '../../view-models/buildViewModelForResource/viewModelBuilders/buildPhotographViewModels';
import buildSpatialFeatureViewModels from '../../view-models/buildViewModelForResource/viewModelBuilders/buildSpatialFeatureViewModels';
import buildTermViewModels from '../../view-models/buildViewModelForResource/viewModelBuilders/buildTermViewModels';
import buildTranscribedAudioViewModels from '../../view-models/buildViewModelForResource/viewModelBuilders/buildTranscribedAudioViewModels';
import buildVocabularyListViewModels from '../../view-models/buildViewModelForResource/viewModelBuilders/buildVocabularyListViewModels';
import {
    HasViewModelId,
    TagViewModel,
    TermViewModel,
    VocabularyListViewModel,
} from '../../view-models/buildViewModelForResource/viewModels';
import { BookViewModel } from '../../view-models/buildViewModelForResource/viewModels/book.view-model';
import { PhotographViewModel } from '../../view-models/buildViewModelForResource/viewModels/photograph.view-model';
import { SpatialFeatureViewModel } from '../../view-models/buildViewModelForResource/viewModels/spatial-data/spatial-feature.view-model';
import { TranscribedAudioViewModel } from '../../view-models/buildViewModelForResource/viewModels/transcribed-audio/transcribed-audio.view-model';
import { buildAllResourceDescriptions } from '../../view-models/resourceDescriptions/buildAllResourceDescriptions';
import httpStatusCodes from '../constants/httpStatusCodes';
import buildViewModelPathForResourceType from './utilities/buildViewModelPathForResourceType';

const buildByIdApiParamMetadata = () => ({
    name: 'id',
    required: true,
    example: '2',
});

export const RESOURCES_ROUTE_PREFIX = 'resources';

@ApiTags(RESOURCES_ROUTE_PREFIX)
@Controller(RESOURCES_ROUTE_PREFIX)
export class ResourceViewModelController {
    constructor(
        private readonly repositoryProvider: RepositoryProvider,
        private readonly configService: ConfigService
    ) {}

    @Get('')
    getAllResourceDescriptions() {
        const appGlobalPrefix = this.configService.get<string>('GLOBAL_PREFIX');

        const fullResourcesBasePath = `/${appGlobalPrefix}/${RESOURCES_ROUTE_PREFIX}`;

        return buildAllResourceDescriptions(fullResourcesBasePath);
    }

    /* ********** TERMS ********** */
    @ApiOkResponse({ type: TermViewModel, isArray: true })
    @Get(buildViewModelPathForResourceType(resourceTypes.term))
    async fetchTerms(@Res() res) {
        const allTermViewModels = await buildTermViewModels({
            repositoryProvider: this.repositoryProvider,
            configService: this.configService,
        });

        if (isInternalError(allTermViewModels))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(allTermViewModels),
            });

        return res.status(httpStatusCodes.ok).send(allTermViewModels.map(cloneToPlainObject));
    }

    @ApiParam(buildByIdApiParamMetadata())
    @ApiOkResponse({ type: TermViewModel })
    @Get(`${buildViewModelPathForResourceType(resourceTypes.term)}/:id`)
    async fetchTermById(@Res() res, @Param() params: unknown) {
        const { id } = params as HasViewModelId;

        if (!isResourceId(id))
            return res.status(httpStatusCodes.badRequest).send({
                error: `Invalid input for id: ${id}`,
            });

        const searchResult = await this.repositoryProvider
            .forResource<Term>(resourceTypes.term)
            .fetchById(id);

        if (isInternalError(searchResult))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(searchResult),
            });

        if (isNotFound(searchResult)) return res.status(httpStatusCodes.notFound).send();

        if (!searchResult.published) return res.status(httpStatusCodes.notFound).send();

        const termViewModel = new TermViewModel(
            searchResult,
            this.configService.get<string>('BASE_DIGITAL_ASSET_URL')
        );

        const dto = cloneToPlainObject(termViewModel);

        return res.status(httpStatusCodes.ok).send(dto);
    }

    /* ********** VOCABULARY LISTS ********** */
    @ApiOkResponse({ type: VocabularyListViewModel, isArray: true })
    @Get(buildViewModelPathForResourceType(resourceTypes.vocabularyList))
    async fetchVocabularyLists(@Res() res) {
        const allViewModels = await buildVocabularyListViewModels({
            repositoryProvider: this.repositoryProvider,
            configService: this.configService,
        });

        if (isInternalError(allViewModels))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(allViewModels),
            });

        return res.status(httpStatusCodes.ok).send(allViewModels.map(cloneToPlainObject));
    }

    @ApiParam(buildByIdApiParamMetadata())
    @ApiOkResponse({ type: VocabularyListViewModel })
    @Get(`${buildViewModelPathForResourceType(resourceTypes.vocabularyList)}/:id`)
    async fetchVocabularyListById(@Res() res, @Param() params: unknown) {
        const { id } = params as HasViewModelId;

        if (!isResourceId(id))
            return res.status(httpStatusCodes.badRequest).send({
                error: `Invalid input for id: ${id}`,
            });

        // TODO break this out to a separate helper, it doesn't belong in the controller

        const [vocabularyListSearchResult, allTerms] = await Promise.all([
            this.repositoryProvider
                .forResource<VocabularyList>(resourceTypes.vocabularyList)
                .fetchById(id),
            this.repositoryProvider
                .forResource<Term>(resourceTypes.term)
                .fetchMany()
                .then((allResults) =>
                    allResults.filter((result): result is Term => !isInternalError(result))
                ),
        ]);

        if (isInternalError(vocabularyListSearchResult)) {
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(vocabularyListSearchResult),
            });
        }

        if (isNotFound(vocabularyListSearchResult))
            return res.status(httpStatusCodes.notFound).send();

        if (!vocabularyListSearchResult.published)
            return res.status(httpStatusCodes.notFound).send();

        const viewModel = new VocabularyListViewModel(
            vocabularyListSearchResult,
            allTerms,
            this.configService.get<string>('BASE_DIGITAL_ASSET_URL')
        );

        const dto = cloneToPlainObject(viewModel);

        return res.status(httpStatusCodes.ok).send(dto);
    }

    /* ********** AUDIO WITH TRANSRIPT ********** */
    @ApiOkResponse({ type: TranscribedAudioViewModel, isArray: true })
    @Get(buildViewModelPathForResourceType(resourceTypes.transcribedAudio))
    async fetchAudioViewModelsWithTranscripts(@Res() res) {
        const allViewModels = await buildTranscribedAudioViewModels({
            repositoryProvider: this.repositoryProvider,
            configService: this.configService,
        });

        if (isInternalError(allViewModels))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(allViewModels),
            });

        return res.status(httpStatusCodes.ok).send(allViewModels.map(cloneToPlainObject));
    }

    @ApiParam(buildByIdApiParamMetadata())
    @ApiOkResponse({ type: TagViewModel })
    @Get(`${buildViewModelPathForResourceType(resourceTypes.transcribedAudio)}/:id`)
    async fetchTranscribedAudioById(@Res() res, @Param() params: unknown) {
        const { id } = params as HasViewModelId;

        if (!isResourceId(id))
            return res.status(httpStatusCodes.badRequest).send({
                error: `Invalid input for id: ${id}`,
            });

        const searchResult = await this.repositoryProvider
            .forResource<TranscribedAudio>(resourceTypes.transcribedAudio)
            .fetchById(id);

        if (isInternalError(searchResult))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(searchResult),
            });

        if (isNotFound(searchResult)) return res.status(httpStatusCodes.notFound).send();

        if (!searchResult.published) return res.status(httpStatusCodes.notFound).send();

        const viewModel = new TranscribedAudioViewModel(
            searchResult,
            this.configService.get<string>('BASE_DIGITAL_ASSET_URL')
        );

        const dto = cloneToPlainObject(viewModel);

        return res.status(httpStatusCodes.ok).send(dto);
    }

    /* ********** BOOKS ********** */
    @ApiOkResponse({ type: BookViewModel, isArray: true })
    @Get(buildViewModelPathForResourceType(resourceTypes.book))
    async fetchBooks(@Res() res) {
        const allViewModels = await buildBookViewModels({
            repositoryProvider: this.repositoryProvider,
            configService: this.configService,
        });

        if (isInternalError(allViewModels))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(allViewModels),
            });

        return res.status(httpStatusCodes.ok).send(allViewModels.map(cloneToPlainObject));
    }

    @ApiParam(buildByIdApiParamMetadata())
    @ApiOkResponse({ type: BookViewModel })
    @Get(`${buildViewModelPathForResourceType(resourceTypes.book)}/:id`)
    async fetchBookById(@Res() res, @Param() params: unknown) {
        const { id } = params as HasViewModelId;

        if (!isResourceId(id))
            return res.status(httpStatusCodes.badRequest).send({
                error: `Invalid input for id: ${id}`,
            });

        const searchResult = await this.repositoryProvider
            .forResource<Book>(resourceTypes.book)
            .fetchById(id);

        if (isInternalError(searchResult))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(searchResult),
            });

        if (isNotFound(searchResult)) return res.status(httpStatusCodes.notFound).send();

        if (!searchResult.published) return res.status(httpStatusCodes.notFound).send();

        const viewModel = new BookViewModel(searchResult);

        const dto = cloneToPlainObject(viewModel);

        return res.status(httpStatusCodes.ok).send(dto);
    }

    /* ********** PHOTOGRAPHS   ********** */
    @ApiOkResponse({ type: PhotographViewModel, isArray: true })
    @Get(buildViewModelPathForResourceType(resourceTypes.photograph))
    async fetchPhotographs(@Res() res) {
        const allViewModels = await buildPhotographViewModels({
            repositoryProvider: this.repositoryProvider,
            configService: this.configService,
        });

        if (isInternalError(allViewModels))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(allViewModels),
            });

        return res.status(httpStatusCodes.ok).send(allViewModels.map(cloneToPlainObject));
    }

    @ApiParam(buildByIdApiParamMetadata())
    @ApiOkResponse({ type: PhotographViewModel })
    @Get(`${buildViewModelPathForResourceType(resourceTypes.photograph)}/:id`)
    async fetchPhotographById(@Res() res, @Param() params: unknown) {
        const { id } = params as HasViewModelId;

        if (!isResourceId(id))
            return res.status(httpStatusCodes.badRequest).send({
                error: `Invalid input for id: ${id}`,
            });

        const searchResult = await this.repositoryProvider
            .forResource<Photograph>(resourceTypes.photograph)
            .fetchById(id);

        if (isInternalError(searchResult))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(searchResult),
            });

        if (isNotFound(searchResult)) return res.status(httpStatusCodes.notFound).send();

        if (!searchResult.published) return res.status(httpStatusCodes.notFound).send();

        const viewModel = new PhotographViewModel(
            searchResult,
            this.configService.get<string>('BASE_DIGITAL_ASSET_URL')
        );

        const dto = cloneToPlainObject(viewModel);

        return res.status(httpStatusCodes.ok).send(dto);
    }

    /* ********** SPATIAL FEATURE   ********** */
    @ApiOkResponse({ type: SpatialFeatureViewModel, isArray: true })
    @Get(buildViewModelPathForResourceType(resourceTypes.spatialFeature))
    async fetchSpatialFeatures(@Res() res) {
        const allViewModels = await buildSpatialFeatureViewModels({
            repositoryProvider: this.repositoryProvider,
            configService: this.configService,
        });

        if (isInternalError(allViewModels))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(allViewModels),
            });

        return res.status(httpStatusCodes.ok).send(allViewModels.map(cloneToPlainObject));
    }

    @ApiParam(buildByIdApiParamMetadata())
    @ApiOkResponse({ type: SpatialFeatureViewModel })
    @Get(`${buildViewModelPathForResourceType(resourceTypes.spatialFeature)}/:id`)
    async fetchSpatialFeatureById(@Res() res, @Param() params: unknown) {
        const { id } = params as HasViewModelId;

        if (!isResourceId(id))
            return res.status(httpStatusCodes.badRequest).send({
                error: `Invalid input for id: ${id}`,
            });

        const searchResult = await this.repositoryProvider
            .forResource<ISpatialFeature>(resourceTypes.spatialFeature)
            .fetchById(id);

        if (isInternalError(searchResult))
            return res.status(httpStatusCodes.internalError).send({
                error: JSON.stringify(searchResult),
            });

        if (isNotFound(searchResult)) return res.status(httpStatusCodes.notFound).send();

        if (!searchResult.published) return res.status(httpStatusCodes.notFound).send();

        const viewModel = new SpatialFeatureViewModel(searchResult);

        const dto = cloneToPlainObject(viewModel);

        return res.status(httpStatusCodes.ok).send(dto);
    }
}