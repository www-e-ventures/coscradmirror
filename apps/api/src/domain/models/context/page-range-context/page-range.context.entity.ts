import { DTO } from '../../../../types/DTO';
import BaseDomainModel from '../../BaseDomainModel';
import { PageIdentifier } from '../../book/entities/types/PageIdentifier';
import { IEdgeConnectionContext } from '../interfaces/IEdgeConnectionContext';
import { EdgeConnectionContextType } from '../types/EdgeConnectionContextType';

export class PageRangeContext extends BaseDomainModel implements IEdgeConnectionContext {
    readonly type = EdgeConnectionContextType.pageRange;

    readonly pageIdentifiers: PageIdentifier[];

    constructor({ pageIdentifiers }: DTO<PageRangeContext>) {
        super();

        // Update this cloning logic if `PageIdentifier` becomes a reference type
        this.pageIdentifiers = Array.isArray(pageIdentifiers) ? [...pageIdentifiers] : [];
    }
}
