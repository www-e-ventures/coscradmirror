import {
  configServiceFactory,
  Environment,
  isDatabaseConfigOptions
} from './config.service';

describe('config service', () => {
  describe('when the environment is development', () => {
    // Arrange
    const testConfigService = configServiceFactory(Environment.development);

    // Expect
    it('should be defined', () => {
      expect(testConfigService).toBeTruthy();
    });

    it('should have a mode', () => {
      const getMode = () => testConfigService.ensureValues(['MODE']);

      expect(getMode).not.toThrow();
    });

    describe('the ArangoDB config', () => {
      const dbConfig = testConfigService.getArangoConfig();
      it('should be defined', () => {
        expect(dbConfig).toBeTruthy();
      });

      it('should be of the right type', () => {
        expect(isDatabaseConfigOptions(dbConfig)).toEqual(true);
      });
    });

    describe('the Authorization config', () => {
      const authConfig = testConfigService.getAuthorizationConfig();
      it('should be defined', () => {
        expect(authConfig).toBeTruthy();
    });
  });

  describe('the mode', () => {
    it('should not be production', () => {
      expect(testConfigService.isProduction()).toBe(false);
    });
})
  })
})
