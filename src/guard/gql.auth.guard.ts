import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    if (!ctx.getContext().cache) {
      ctx.getContext().cache = {
        // add(type, id, object) =>
      }
    }
    return ctx.getContext().req;
  }

  handleRequest(err, user) {
    if (err) {
      throw new Error('invalid token')
    }
    return user
  }
}
