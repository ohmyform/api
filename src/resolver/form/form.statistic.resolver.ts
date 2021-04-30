import { Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { Roles } from '../../decorator/roles.decorator'
import { FormStatisticModel } from '../../dto/form/form.statistic.model'
import { FormStatisticService } from '../../service/form/form.statistic.service'

@Resolver(() => FormStatisticModel)
export class FormStatisticResolver {
  constructor(
    private readonly statisticService: FormStatisticService,
  ) {
  }

  @Query(() => FormStatisticModel)
  async getFormStatistic(): Promise<FormStatisticModel> {
    return new FormStatisticModel()
  }

  @ResolveField('total', () => GraphQLInt)
  @Roles('admin')
  getTotal(): Promise<number> {
    return this.statisticService.getTotal()
  }
}
