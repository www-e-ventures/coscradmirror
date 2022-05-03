import { Controller, Get, Param, Res } from '@nestjs/common';
import { Tag } from '../../domain/models/tag/tag.entity';
import { isResourceId } from '../../domain/types/ResourceId';
import { InternalError, isInternalError } from '../../lib/errors/InternalError';
import { isNotFound } from '../../lib/types/not-found';
import cloneToPlainObject from '../../lib/utilities/cloneToPlainObject';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { TagViewModel } from '../../view-models/buildViewModelForResource/viewModels';
import httpStatusCodes from '../constants/httpStatusCodes';

@Controller('tags')
export class TagController {
    constructor(private readonly repositoryProvider: RepositoryProvider) {}

    @Get('/:id')
    async fetchById(@Res() res, @Param('id') id: string) {
        if (!isResourceId(id))
            return res
                .status(httpStatusCodes.badRequest)
                .send(new InternalError(`Invalid tag ID: ${id}`));

        const result = await this.repositoryProvider.getTagRepository().fetchById(id);

        if (isInternalError(result)) return res.status(httpStatusCodes.badRequest).send(result);

        if (isNotFound(result)) return res.status(httpStatusCodes.notFound).send();

        const viewModel = cloneToPlainObject(new TagViewModel(result));

        return res.status(httpStatusCodes.ok).send(viewModel);
    }

    @Get('')
    async fetchMay(@Res() res) {
        const result = await this.repositoryProvider.getTagRepository().fetchMany();

        const allErrors = result.filter(isInternalError);

        if (allErrors.length > 0)
            return res
                .status(httpStatusCodes.internalError)
                .send(allErrors.reduce((msg, error) => msg + '\n' + error.toString(), ''));

        // Can we make the above condition a typeguard and avoid casting?
        const allTags = result as Tag[];

        const viewModels = allTags.map((tag) => new TagViewModel(tag));

        return res.status(httpStatusCodes.ok).send(viewModels);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Post()
    // async addOneTag(@Res() res, @Query('text') text: string) {
    //     const tagRepository = this.repositoryProvider.forResource<Tag>(resourceTypes.tag);

    //     // We should add `Where filters`
    //     const allTagsQueryResult = await tagRepository.fetchMany();

    //     const allErrors = allTagsQueryResult.filter((result): result is InternalError =>
    //         isInternalError(result)
    //     );

    //     if (allErrors.length)
    //         return res.status(httpStatusCodes.badRequest).send(JSON.stringify(allTagsQueryResult));

    //     // We have established there were no errors at this point
    //     const allTags = allTagsQueryResult as Tag[];

    //     const existingTagWithSameText = allTags.find(
    //         ({ text: textOfExistingTag }) => text === textOfExistingTag
    //     );

    //     // Check if there is already a tag with the requested text
    //     if (existingTagWithSameText)
    //         return res
    //             .status(httpStatusCodes.badRequest)
    //             .send(JSON.stringify(new TagAlreadyExistsError(text)));

    //     const createTagDto: DeepPartial<DTO<Tag>> = {
    //         text,
    //     };

    //     const domainValidationResult = tagValidator(createTagDto);

    //     if (isInternalError(domainValidationResult))
    //         return res
    //             .status(httpStatusCodes.badRequest)
    //             .send(JSON.stringify(domainValidationResult));

    //     // TODO We need to think about ID generation or else make ID optional here
    //     await tagRepository.create(new Tag(createTagDto as DTO<Tag>));

    //     // Send `Ack`
    //     return res.sendStatus(httpStatusCodes.ok);
    // }

    // TODO support update
    // @UseGuards(AuthGuard('jwt'))
    // @Put()
    // async updateTag(
    //   @Res() res,
    //   @Query('id') id: string,
    //   @Query('text') text: string
    // ) {
    //   if (!isEntityId(id))
    //     return res.status(httpStatusCodes.badRequest).send('Invalid tag id');

    //   if (!isStringWithNonzeroLength(text))
    //     return res.status(httpStatusCodes.badRequest).send('Invalid tag text');

    //   const tagRepository = this.repositoryProvider.forEntity<Tag>(
    //     resourceTypes.tag
    //   );

    //   const existingTagResult = await tagRepository.fetchById(id);

    //   if (isInternalError(existingTagResult))
    //     return res.status(httpStatusCodes.badRequest).send('error fetching tag');

    //   if (isNotFound(existingTagResult))
    //     return res
    //       .status(httpStatusCodes.badRequest)
    //       .send(`There is no tag with id: ${id}`);

    //   existingTagResult;
    // }
}
