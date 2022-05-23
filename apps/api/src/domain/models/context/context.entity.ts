import { IsEnum } from 'class-validator';
import BaseDomainModel from '../BaseDomainModel';
import { EdgeConnectionContextType } from './types/EdgeConnectionContextType';

export abstract class EdgeConnectionContext extends BaseDomainModel {
    @IsEnum(EdgeConnectionContextType)
    abstract readonly type: EdgeConnectionContextType;
}
