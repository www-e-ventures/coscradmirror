import { AuthConfigOptions } from './environment';

export default (): AuthConfigOptions => ({
  domain: '<my-tenant-name>.auth0.com',
  clientId: 'my-client-id',
  audience: 'https://my.identifier.com',
});
