import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { resourceTypes } from '../../../types/resourceTypes';
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
        super(dto);

        const { title, subtitle, author, publicationDate, pages: pageDTOs } = dto;

        this.title = title;

        this.subtitle = subtitle;

        this.author = author;

        this.publicationDate = publicationDate;

        // TODO remove all casts like this
        this.pages = (pageDTOs as BookPage[]).map((pageDTO) => new BookPage(pageDTO));
    }
}
