import { Context, Query } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { ProfileModel } from '../../dto/profile/profile.model';
import { UserDocument } from '../../schema/user.schema';
import { ContextCache } from '../context.cache';

export class ProfileResolver {
  @Query(() => ProfileModel)
  @Roles('user')
  async me(
    @User() user: UserDocument,
    @Context('cache') cache: ContextCache,
  ): Promise<ProfileModel> {
    cache.addUser(user)

    return new ProfileModel(user)
  }
}
