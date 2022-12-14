import {
    DiscriminatedBy,
    ISBN,
    NestedDataType,
    NonEmptyString,
    PositiveInteger,
    URL,
    Year,
} from '@coscrad/data-types';
import { IsNonEmptyArray } from '@coscrad/validation';
import { DTO } from '../../../../../types/DTO';
import { isNullOrUndefined } from '../../../../utilities/validation/is-null-or-undefined';
import BaseDomainModel from '../../../BaseDomainModel';
import BibliographicReferenceCreator from '../../common/bibliographic-reference-creator.entity';
import { IBibliographicReferenceData } from '../../interfaces/bibliographic-reference-data.interface';
import { BibliographicReferenceType } from '../../types/BibliographicReferenceType';

const isOptional = true;

@DiscriminatedBy(BibliographicReferenceType.book)
export default class BookBibliographicReferenceData
    extends BaseDomainModel
    implements IBibliographicReferenceData
{
    readonly type = BibliographicReferenceType.book;

    @NonEmptyString()
    readonly title: string;

    @IsNonEmptyArray()
    @NestedDataType(BibliographicReferenceCreator, { isArray: true })
    readonly creators: BibliographicReferenceCreator[];

    @NonEmptyString({ isOptional })
    // `abstractNote` is what Zotero calls this property
    readonly abstract?: string;

    @Year({ isOptional })
    readonly year?: number;

    @NonEmptyString({ isOptional })
    readonly publisher?: string;

    @NonEmptyString({ isOptional })
    readonly place?: string;

    @URL({ isOptional })
    readonly url?: string;

    @PositiveInteger({ isOptional })
    readonly numberOfPages?: number;

    @ISBN({ isOptional })
    readonly isbn?: string;

    constructor(dto: DTO<BookBibliographicReferenceData>) {
        super();

        if (isNullOrUndefined(dto)) return;

        this.title = dto.title;

        this.creators = dto.creators as BibliographicReferenceCreator[];

        this.abstract = dto.abstract;

        this.year = dto.year;

        this.publisher = dto.publisher;

        this.place = dto.place;

        this.url = dto.url;

        this.isbn = dto.isbn;

        this.numberOfPages = dto.numberOfPages;
    }
}
