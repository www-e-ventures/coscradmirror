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
    const expectedData = {
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
    };

    it('should return the expected data', () => {
      expect(service.getData()).toEqual(expectedData);
    });
  });
});
