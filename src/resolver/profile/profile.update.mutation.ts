import { Injectable } from '@nestjs/common';
import { Args, Context, Mutation } from '@nestjs/graphql';
import { User } from '../../decorator/user.decorator';
import { ProfileModel } from '../../dto/profile/profile.model';
import { ProfileUpdateInput } from '../../dto/profile/profile.update.input';
import { UserDocument } from '../../schema/user.schema';
import { ProfileUpdateService } from '../../service/profile/profile.update.service';
import { ContextCache } from '../context.cache';

@Injectable()
export class ProfileUpdateMutation {
  constructor(
    private readonly updateService: ProfileUpdateService,
  ) {
  }

  @Mutation(() => ProfileModel)
  async updateProfile(
    @User() user: UserDocument,
    @Args({ name: 'user', type: () => ProfileUpdateInput }) input: ProfileUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<ProfileModel> {
    await this.updateService.update(user, input)

    cache.addUser(user)

    return new ProfileModel(user)
  }
}
