import {
  configServiceFactory,
  Environment,
  isDatabaseConfigOptions,
} from './config.service';

describe('config service', () => {
  describe('when the environment is development', () => {
    // Arrange
    const testConfigService = configServiceFactory(Environment.development);

    // Act
    const dbConfig = testConfigService.getArangoConfig();

    // Expect
    it('should be defined', () => {
      expect(testConfigService).toBeTruthy();
    });

    it('should have a mode', () => {
      const getMode = () => testConfigService.ensureValues(['MODE']);

      expect(getMode).not.toThrow();
    });

    describe('the ArangoDB config', () => {
      it('should be defined', () => {
        expect(dbConfig).toBeTruthy();
      });

      it('should be of the right type', () => {
        expect(isDatabaseConfigOptions(dbConfig)).toEqual(true);
      });
    });

    describe('the mode', () => {
      it('should not be production', () => {
        expect(testConfigService.isProduction()).toBe(false);
      });
    });
  });
});
