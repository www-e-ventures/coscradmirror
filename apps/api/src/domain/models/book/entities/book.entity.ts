import { InternalError } from 'apps/api/src/lib/errors/InternalError';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { Valid } from '../../../domainModelValidators/Valid';
import { resourceTypes } from '../../../types/resourceTypes';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';
import { PageRangeContext } from '../../context/page-range-context/page-range.context.entity';
import { Resource } from '../../resource.entity';
import BookPage from './BookPage';

export class Book extends Resource {
    readonly type = resourceTypes.book;

    readonly title: string;

    readonly subtitle?: string;

    // TODO Use `contributorID` instead
    readonly author: string;

    // TODO Determine a publication model
    readonly publicationDate?: string;

    pages: BookPage[];

    constructor(dto: PartialDTO<Book>) {
        super({ ...dto, type: resourceTypes.book });

        const { title, subtitle, author, publicationDate, pages: pageDTOs } = dto;

        this.title = title;

        this.subtitle = subtitle;

        this.author = author;

        this.publicationDate = publicationDate;

        // TODO remove all casts like this
        this.pages = (pageDTOs as BookPage[]).map((pageDTO) => new BookPage(pageDTO));
    }

    /**
     *
     * This relies on convention. It's a clever way to avoid a switch statement.
     * TODO capitalize first letter
     */
    protected validatePageRangeContext(context: PageRangeContext): Valid | InternalError {
        if (isNullOrUndefined(context))
            return new InternalError(`Page Range Context is undefined for book: ${this.id}`);

        const { pages } = context;

        const missingPages = pages.reduce(
            (accumulatedList, pageIdentifier) =>
                this.pages.some(({ identifier }) => identifier === pageIdentifier)
                    ? accumulatedList
                    : accumulatedList.concat(pageIdentifier),
            []
        );

        if (missingPages.length > 0) return new InternalError(`Missing pages`);

        return Valid;
    }
}
