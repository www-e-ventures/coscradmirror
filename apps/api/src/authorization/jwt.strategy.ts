import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const issuerURL = configService.get<string>('AUTH0_ISSUER_URL');
    if (!issuerURL)
      throw new Error('Internal Error: could not determine issuer url');

    const audience = configService.get<string>('AUTH0_AUDIENCE');
    if (!audience)
      throw new Error('Internal Error: could not determine audience');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerURL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'https://tw-research.tsilhqotinlanguage.ca',
      issuer: issuerURL,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
