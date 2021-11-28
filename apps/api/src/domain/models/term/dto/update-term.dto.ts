import { PartialType } from '@nestjs/mapped-types';
import { CreateTermDto } from './create-term.dto';

// TODO [refactor] remove in favor of `PartialDTO<Term>`
export class UpdateTermDto extends PartialType(CreateTermDto) {}
