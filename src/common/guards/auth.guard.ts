import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ErrorMessages } from '../../common/constants'
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization
    console.log("🚀 ~ file: auth.guard.ts:22 ~ JwtAuthGuard ~ canActivate ~ token:", token)
    if (!token) {
    }
    
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // throw ErrorMessages.auth.unauthorized;
    }
    return user;
  }
}
