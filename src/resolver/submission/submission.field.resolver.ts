import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { FormFieldModel } from '../../dto/form/form.field.model'
import { SubmissionFieldModel } from '../../dto/submission/submission.field.model'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'
import { ContextCache } from '../context.cache'

@Resolver(() => SubmissionFieldModel)
export class SubmissionFieldResolver {
  @ResolveField('field', () => FormFieldModel, { nullable: true })
  async getFields(
    @Parent() parent: SubmissionFieldModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldModel> {
    const submissionField = await cache.get<SubmissionFieldEntity>(cache.getCacheKey(SubmissionFieldEntity.name, parent.id))

    if (!submissionField.field) {
      return null
    }

    return new FormFieldModel(submissionField.field)
  }
}
