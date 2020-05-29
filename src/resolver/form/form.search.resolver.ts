import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';
import { User } from '../../decorator/user.decorator';
import { FormModel } from '../../dto/form/form.model';
import { PagerFormModel } from '../../dto/form/pager.form.model';
import { UserDocument } from '../../schema/user.schema';
import { FormService } from '../../service/form/form.service';
import { ContextCache } from '../context.cache';

@Resolver(() => PagerFormModel)
export class FormSearchResolver {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @Query(() => PagerFormModel)
  async listForms(
    @User() user: UserDocument,
    @Args('start', {type: () => GraphQLInt, defaultValue: 0, nullable: true}) start,
    @Args('limit', {type: () => GraphQLInt, defaultValue: 50, nullable: true}) limit,
    @Context('cache') cache: ContextCache,
  ) {
    const [forms, total] = await this.formService.find(user, start, limit)

    forms.forEach(form => cache.addForm(form))

    return new PagerFormModel(
      forms.map(form => new FormModel(form)),
      total,
      limit,
      start,
    )
  }
}
