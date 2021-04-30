import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { ContextCache } from '../resolver/context.cache'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    if (!ctx.getContext().cache) {
      ctx.getContext().cache = new ContextCache()
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
