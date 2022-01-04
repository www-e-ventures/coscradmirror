import { MediaItem } from '@coscrad/api-interfaces';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

type Message = {
  message: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('hello')
  getData(): MediaItem {
    console.log(`You called get!`);
    return this.appService.getData();
  }
  @Get('')
  getWelcomeMessage(): Message {
    return { message: 'Welcome to the COSCRAD API!' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('message')
  async create(@Body('data') data: string): Promise<void> {
    console.log(`received data: ${data}`);
    this.appService.postData(data);
  }
}
