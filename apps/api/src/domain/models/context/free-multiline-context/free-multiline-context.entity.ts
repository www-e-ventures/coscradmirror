import cloneToPlainObject from 'apps/api/src/lib/utilities/cloneToPlainObject';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { Line2D } from '../../spatial-feature/types/Coordinates/Line2d';
import { EdgeConnectionContext } from '../context.entity';
import { EdgeConnectionContextType } from '../types/EdgeConnectionContextType';

/**
 * A `free multiline` is a collection of one or more (typically
 * jagged) line segments specified as an ordered array of points. It's individual
 * lines are subject to no topological constraints. Figure eights, spirographs,
 * zig-zags, and so on are allowed.
 */
export class FreeMultilineContext extends EdgeConnectionContext {
    readonly type = EdgeConnectionContextType.freeMultiline;

    readonly lines: Line2D[];

    constructor({ lines }: PartialDTO<FreeMultilineContext>) {
        super();

        // Avoid side-effects
        this.lines = Array.isArray(lines) && lines.length > 0 ? cloneToPlainObject(lines) : [];
    }
}
