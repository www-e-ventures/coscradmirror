import { MediaItem } from '@coscrad/api-interfaces';
import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../authorization/optional-jwt-auth-guard';
import { CoscradUserWithGroups } from '../domain/models/user-management/user/entities/user/coscrad-user-with-groups';
import { NotFound } from '../lib/types/not-found';
import sendInternalResultAsHttpResponse from './controllers/resources/common/sendInternalResultAsHttpResponse';
import { Message } from './message.entity';

/**
 * These endpoints are strictly for experimentation.
 */

@ApiTags('sanity checks')
@Controller()
export class AppController {
    @ApiBearerAuth('JWT')
    @UseGuards(OptionalJwtAuthGuard)
    @Get('hello')
    getData(@Request() req, @Response() res): MediaItem {
        if (!(req.user instanceof CoscradUserWithGroups)) {
            return sendInternalResultAsHttpResponse(res, NotFound);
        }

        return sendInternalResultAsHttpResponse(res, req.user.toDTO());
    }

    @Get('')
    @ApiOkResponse({ type: Message })
    getWelcomeMessage(): Message {
        return { message: 'Welcome to the COSCRAD API!' };
    }
}
