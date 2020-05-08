import { Context, Query } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { OwnUserModel } from '../../dto/user/own.user.model';
import { UserDocument } from '../../schema/user.schema';
import { ContextCache } from '../context.cache';

export class ProfileResolver {
  @Query(() => OwnUserModel)
  @Roles('user')
  async me(
    @User() user: UserDocument,
    @Context('cache') cache: ContextCache,
  ): Promise<OwnUserModel> {
    cache.addUser(user)

    return new OwnUserModel(user)
  }
}
