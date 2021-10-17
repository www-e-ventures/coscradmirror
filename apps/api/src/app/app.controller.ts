import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

type Message = {
  message: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getWelcomeMessage(): Message {
    return { message: 'Welcome to the COSCRAD API!' };
  }
}
