import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../decorator/user.decorator';
import { SubmissionFieldModel } from '../../dto/submission/submission.field.model';
import { SubmissionModel } from '../../dto/submission/submission.model';
import { UserDocument } from '../../schema/user.schema';
import { ContextCache } from '../context.cache';

@Resolver(() => SubmissionModel)
export class SubmissionResolver {
  @ResolveField('fields', () => [SubmissionFieldModel])
  async getFields(
    @User() user: UserDocument,
    @Parent() parent: SubmissionModel,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionFieldModel[]> {
    const submission = await cache.getSubmission(parent.id)

    if (!submission.populated('form')) {
      submission.populate('form')
      await submission.execPopulate()
    }

    cache.addForm(submission.form)
    submission.form.fields.forEach(field => {
      cache.addFormField(field)
    })

    return submission.fields.map(field => new SubmissionFieldModel(field))
  }
}
