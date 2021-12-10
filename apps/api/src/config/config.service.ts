require('dotenv').config();

type DatabaseType = 'arangodb';

// TODO Update this typeguard when supporting additional db type
const isDatabaseType = (input: unknown): input is DatabaseType =>
  input === 'arangodb';

export enum Environment {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

type DatabaseConfigOptions = {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  userPassword: string;
  database: string;
  shouldUseSSL: boolean;
};

// Should this be a test utility for now or do we need type safety elsewhere?
export const isDatabaseConfigOptions = (
  input: unknown
): input is DatabaseConfigOptions => {
  const { type, host, port, username, userPassword, database, shouldUseSSL } =
    input as DatabaseConfigOptions;

  return (
    isDatabaseType(type) &&
    typeof host === 'string' &&
    typeof port === 'number' &&
    typeof username === 'string' &&
    typeof userPassword === 'string' &&
    typeof database === 'string' &&
    typeof shouldUseSSL === 'boolean'
  );
};

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, shouldThrowOnMissing = true): string {
    const value = this.env[key];

    if (!value && shouldThrowOnMissing) {
      console.log({
        // checkingThis: this.env,
        value,
        missingKey: key,
      });

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
    const mode = this.getValue('MODE');
    return mode === Environment.production;
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

/**
 *
 * currently `environmentOverride` just overrides 'MODE' from the dot-env environment.
 * update the factory to override the entire environment when `environmentOverride` is defined.
 */
const configServiceFactory = (environmentOveride?: Environment) => {
  const env = {
    ...process.env,
    MODE: 'development',
  };

  return new ConfigService(env).ensureValues([
    'ARANGO_DB_HOST',
    'ARANGO_DB_PORT',
    'ARANGO_DB_USER',
    'ARANGO_DB_USER_PASSWORD',
    'ARANGO_DB_NAME',
    'MODE',
  ]);
};

export { configServiceFactory };
