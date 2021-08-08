import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        filename: 'sample-photo',
        meta: {},
        availableFormats: [
          {
            format: {
              mimeType: 'image/jpeg',
              resolution: 'medium',
            },
            url: 'https://cdn.pixabay.com/photo/2021/07/26/22/04/sea-shell-6495338__340.jpg',
          },
        ],
      });
    });
  });
});
