// This file can be replaced during build by using the `fileReplacements` array.

export type AuthConfigOptions = {
  domain: string;
  clientId: string;
  audience: string;
};

// Extend as additional options are needed
type TokenOptions = {
  audience: string;
};

type AllowedRequest = {
  uri: string;
  tokenOptions: TokenOptions;
};

export type AuthConfig = {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience: string;
  allowedList: AllowedRequest[];
};

export const environment = {
  production: false,

  server: {
    url: 'http://localhost:3333',
  },

  buildAuthConfig: ({
    domain,
    clientId,
    audience,
  }: AuthConfigOptions): AuthConfig => ({
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
    allowedList: [
      {
        uri: `http://localhost:3333/api/*`,
        tokenOptions: {
          // The attached token should target this audience
          audience,

          // The attached token should have these scopes
          // scope: add scopes here
        },
      },
    ],
  }),
};
