import { Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { UserStatisticModel } from '../../dto/user/user.statistic.model'
import { UserStatisticService } from '../../service/user/user.statistic.service'

@Resolver(() => UserStatisticModel)
export class UserStatisticResolver {
  constructor(
    private readonly statisticService: UserStatisticService,
  ) {
  }

  @Query(() => UserStatisticModel)
  getUserStatistic(): UserStatisticModel {
    return new UserStatisticModel()
  }

  @ResolveField('total', () => Int)
  @Roles('admin')
  getTotal(): Promise<number> {
    return this.statisticService.getTotal()
  }
}
