import { DTO } from '../../../../types/DTO';
import { ResourceType } from '../../../types/ResourceType';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';
import { Resource } from '../../resource.entity';
import { IBibliographicReference } from '../interfaces/IBibliographicReference';
import JournalArticleBibliographicReferenceData from './JournalArticleBibliographicReferenceData';

export class JournalArticleBibliographicReference
    extends Resource
    implements IBibliographicReference<JournalArticleBibliographicReferenceData>
{
    readonly type = ResourceType.bibliographicReference;

    readonly data: JournalArticleBibliographicReferenceData;

    constructor(dto: DTO<JournalArticleBibliographicReference>) {
        super({ ...dto, type: ResourceType.bibliographicReference });

        if (isNullOrUndefined(dto)) return;

        this.data = new JournalArticleBibliographicReferenceData(dto.data);
    }
}
