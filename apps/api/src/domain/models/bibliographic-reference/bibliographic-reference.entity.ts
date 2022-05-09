import { resourceTypes } from '../../types/resourceTypes';
import { Resource } from '../resource.entity';

export class BibliographicReference extends Resource {
    readonly type = resourceTypes.bibliographicReference;
}
