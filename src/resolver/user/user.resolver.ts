import { Args, Context, GraphQLExecutionContext, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { rolesType } from '../../config/roles';
import { Roles } from '../../decorator/roles.decorator';
import { UserModel } from '../../dto/user/user.model';
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
  @Roles('superuser')
  async getRoles(
    @Parent() user: UserModel,
    @Context('cache') cache: ContextCache,
  ): Promise<string[]> {
    return (await cache.getUser(user.id)).roles
  }
}
