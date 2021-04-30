import { Injectable } from '@nestjs/common'
import { Args, Context, Mutation } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { ProfileModel } from '../../dto/profile/profile.model'
import { ProfileUpdateInput } from '../../dto/profile/profile.update.input'
import { UserEntity } from '../../entity/user.entity'
import { ProfileUpdateService } from '../../service/profile/profile.update.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class ProfileUpdateMutation {
  constructor(
    private readonly updateService: ProfileUpdateService,
  ) {
  }

  @Mutation(() => ProfileModel)
  async updateProfile(
    @User() user: UserEntity,
    @Args({ name: 'user', type: () => ProfileUpdateInput }) input: ProfileUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<ProfileModel> {
    await this.updateService.update(user, input)

    cache.add(cache.getCacheKey(UserEntity.name, user.id), user)

    return new ProfileModel(user)
  }
}
