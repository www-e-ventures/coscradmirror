require('dotenv').config();

type DatabaseType = 'arangodb';

type DatabaseConfigOptions = {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  userPassword: string;
  database: string;
  shouldUseSSL: boolean;
};

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getDBPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getArangoConfig(): DatabaseConfigOptions {
    return {
      type: 'arangodb',
      host: this.getValue('ARANGO_DB_HOST'),
      port: parseInt(this.getValue('ARANGO_DB_PORT')),
      username: this.getValue('ARANGO_DB_USER'),
      userPassword: this.getValue('ARANGO_DB_USER_PASSWORD'),
      database: this.getValue('ARANGO_DB_NAME'),
      shouldUseSSL: this.isProduction(),
    };
  }
}

const configServiceFactory = () =>
  new ConfigService(process.env).ensureValues([
    'ARANGO_DB_HOST',
    'ARANGO_DB_PORT',
    'ARANGO_DB_USER',
    'ARANGO_DB_USER_PASSWORD',
    'ARANGO_DB_NAME',
  ]);

export { configServiceFactory };
