import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({
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
