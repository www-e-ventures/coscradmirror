import { MediaItem } from '@coscrad/api-interfaces';
import { Controller, Get } from '@nestjs/common';
import { Database } from 'arangojs';
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

  @Get('hello')
  getData(): MediaItem {
    /**
     * TODO Move this connection into configuration \ bootstrapping
     * and use the configuration \ environment variables for the config
     */
    const connectionString = 'http://127.0.0.1/8585';

    try {
      const db = new Database(connectionString);
      db.createDatabase('mydb').then(
        () => console.log('Database created'),
        (err) => console.error('Failed to create database:', err)
      );
    } catch (error) {
      console.error(error.message);
    }

    return this.appService.getData();
  }
}
