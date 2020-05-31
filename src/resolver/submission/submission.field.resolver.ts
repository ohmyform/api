import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FormFieldModel } from '../../dto/form/form.field.model';
import { SubmissionFieldModel } from '../../dto/submission/submission.field.model';
import { ContextCache } from '../context.cache';

@Resolver(() => SubmissionFieldModel)
export class SubmissionFieldResolver {
  @ResolveField('field', () => FormFieldModel, { nullable: true })
  async getFields(
    @Parent() parent: SubmissionFieldModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldModel> {
    const submissionField = await cache.getSubmissionField(parent.id)

    console.log(submissionField.field)

    const field = await cache.getFormField(submissionField.field)

    if (!field) {
      return null
    }

    return new FormFieldModel(field)
  }
}
