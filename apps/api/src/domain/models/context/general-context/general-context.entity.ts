import BaseDomainModel from '../../BaseDomainModel';
import { IEdgeConnectionContext } from '../interfaces/IEdgeConnectionContext';
import { EdgeConnectionContextType } from '../types/EdgeConnectionContextType';

export class GeneralContext extends BaseDomainModel implements IEdgeConnectionContext {
    readonly type = EdgeConnectionContextType.general;
}
