import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '../../domain/models/categories/entities/category.entity';
import { isInternalError } from '../../lib/errors/InternalError';
import cloneToPlainObject from '../../lib/utilities/cloneToPlainObject';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { CateogryTreeViewModel } from '../../view-models/buildViewModelForResource/viewModels/category-tree.view-model';
import httpStatusCodes from '../constants/httpStatusCodes';
import { CATEGORY_TREE_INDEX_ROUTE } from './constants';

@ApiTags('tree of knowledge (categories)')
@Controller(CATEGORY_TREE_INDEX_ROUTE)
export class CategoryController {
    constructor(private readonly repositoryProvider: RepositoryProvider) {}

    // TODO Accept category ID and return corresponding subtree
    @Get('')
    async fetchTree(@Res() res) {
        const result = await this.repositoryProvider.getCategoryRepository().fetchTree();

        const invariantValidationErrors = result.filter(isInternalError);

        if (invariantValidationErrors.length > 0) {
            return res
                .status(httpStatusCodes.internalError)
                .send(invariantValidationErrors.toString());
        }

        const tree = result as Category[];

        const treeViewModel = new CateogryTreeViewModel(tree);

        return res.status(httpStatusCodes.ok).send(cloneToPlainObject(treeViewModel));
    }
}
