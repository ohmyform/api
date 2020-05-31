import { Injectable } from '@nestjs/common';
import { Args, Context, Mutation } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { UserModel } from '../../dto/user/user.model';
import { UserUpdateInput } from '../../dto/user/user.update.input';
import { UserDocument } from '../../schema/user.schema';
import { UserService } from '../../service/user/user.service';
import { UserUpdateService } from '../../service/user/user.update.service';
import { ContextCache } from '../context.cache';

@Injectable()
export class UserUpdateMutation {
  constructor(
    private readonly updateService: UserUpdateService,
    private readonly userService: UserService,
  ) {
  }

  @Mutation(() => UserModel)
  @Roles('superuser')
  async updateUser(
    @User() auth: UserDocument,
    @Args({ name: 'user', type: () => UserUpdateInput }) input: UserUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    if (auth.id === input.id) {
      throw new Error('cannot update your own user')
    }

    const user = await this.userService.findById(input.id)

    await this.updateService.update(user, input)

    cache.addUser(user)

    return new UserModel(user)
  }
}
