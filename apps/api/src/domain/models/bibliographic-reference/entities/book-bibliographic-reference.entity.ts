import { DTO } from '../../../../types/DTO';
import { ResourceType } from '../../../types/ResourceType';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';
import { Resource } from '../../resource.entity';
import { IBibliographicReference } from '../interfaces/IBibliographicReference';
import BookBibliographicReferenceData from './BookBibliographicReferenceData';

export class BookBibliographicReference
    extends Resource
    implements IBibliographicReference<BookBibliographicReferenceData>
{
    readonly type = ResourceType.bibliographicReference;

    readonly data: BookBibliographicReferenceData;

    constructor(dto: DTO<BookBibliographicReference>) {
        super({ ...dto, type: ResourceType.bibliographicReference });

        if (isNullOrUndefined(dto)) return;

        this.data = new BookBibliographicReferenceData(dto.data);
    }
}
