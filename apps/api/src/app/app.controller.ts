import { MediaItem } from '@coscrad/api-interfaces';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): MediaItem {
    return this.appService.getData();
  }
}
