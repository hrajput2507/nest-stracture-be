import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ErrorMessages, RefStrings } from 'src/common/constants';
import { ConfigurationService } from 'src/config/config.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly authService: AuthService, // private readonly configService: ConfigurationService,
    configService: ConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    // const user = await this.authService.validateJwtPayload(payload);
    // if (!user) {
    //   throw ErrorMessages.auth.unauthorized;
    // }
    // return user;
  }
}
