import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Book } from 'apps/api/src/domain/models/book/entities/book.entity';
import { EntityId } from 'apps/api/src/domain/types/EntityId';

export class BookViewModel {
    // Should this be `ViewModelId`
    @ApiProperty({
        example: '12',
        description: 'uniquely identifies a tag amongst other tags',
    })
    readonly id: EntityId;

    @ApiProperty({
        example: 'How I won the Lottery',
        description: 'the title of the book',
    })
    readonly title: string;

    @ApiPropertyOptional({
        example: "A Fool's Tale",
        description: 'subtitle of the book',
    })
    readonly subtitle?: string;

    @ApiProperty({
        example: 'Susan Deer',
        description: 'the author who wrote this book',
    })
    readonly author: string;

    @ApiPropertyOptional({
        example: '1998',
        description: 'the date the book was published',
    })
    readonly publicationDate: string;

    // TODO Add Pages

    constructor({ id, title, subtitle, author, publicationDate }: Book) {
        this.id = id;

        this.title = title;

        this.subtitle = subtitle;

        this.author = author;

        this.publicationDate = publicationDate;
    }
}