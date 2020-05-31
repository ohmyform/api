import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';
import { Roles } from '../../decorator/roles.decorator';
import { PagerUserModel } from '../../dto/user/pager.user.model';
import { UserModel } from '../../dto/user/user.model';
import { UserService } from '../../service/user/user.service';
import { ContextCache } from '../context.cache';

@Resolver(() => PagerUserModel)
export class UserSearchResolver {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Query(() => PagerUserModel)
  @Roles('superuser')
  async listUsers(
    @Args('start', {type: () => GraphQLInt, defaultValue: 0, nullable: true}) start,
    @Args('limit', {type: () => GraphQLInt, defaultValue: 50, nullable: true}) limit,
    @Context('cache') cache: ContextCache,
  ): Promise<PagerUserModel> {
    const [entities, total] = await this.userService.find(start, limit)

    return new PagerUserModel(
      entities.map(entity => {
        cache.addUser(entity)
        return new UserModel(entity)
      }),
      total,
      limit,
      start,
    )
  }
}
