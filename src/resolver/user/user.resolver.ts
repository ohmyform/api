import { Args, Context, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { UserModel } from '../../dto/user/user.model';
import { UserDocument } from '../../schema/user.schema';
import { UserService } from '../../service/user/user.service';
import { ContextCache } from '../context.cache';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Query(() => UserModel)
  @Roles('admin')
  async getUserById(
    @Args('id', {type: () => ID}) id,
    @Context('cache') cache: ContextCache,
  ) {
    const user = await this.userService.findById(id)

    cache.addUser(user)

    return new UserModel(user)
  }

  @ResolveField('roles', () => [String])
  @Roles('user')
  async getRoles(
    @User() user: UserDocument,
    @Parent() parent: UserModel,
    @Context('cache') cache: ContextCache,
  ): Promise<string[]> {
    return await this.returnFieldForSuperuser(
      await cache.getUser(parent.id),
      user,
      c => c.roles
    )
  }

  async returnFieldForSuperuser<T>(parent: UserDocument, user: UserDocument, callback: (user: UserDocument) => T): Promise<T> {
    if (user.id !== parent.id && !await this.userService.isSuperuser(user)) {
      throw new Error('No access to roles')
    }

    return callback(parent)
  }
}
