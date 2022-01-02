import { Context, Query } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { ProfileModel } from '../../dto/profile/profile.model'
import { UserEntity } from '../../entity/user.entity'
import { ContextCache } from '../context.cache'

export class ProfileResolver {
  @Query(() => ProfileModel)
  @Roles('user')
  public me(
    @User() user: UserEntity,
    @Context('cache') cache: ContextCache,
  ): ProfileModel {
    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new ProfileModel(user)
  }
}
