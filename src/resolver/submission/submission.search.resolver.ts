import { Args, Context, ID, Query, Resolver } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';
import { User } from '../../decorator/user.decorator';
import { PagerSubmissionModel } from '../../dto/submission/pager.submission.model';
import { SubmissionModel } from '../../dto/submission/submission.model';
import { UserDocument } from '../../schema/user.schema';
import { FormService } from '../../service/form/form.service';
import { SubmissionService } from '../../service/submission/submission.service';
import { ContextCache } from '../context.cache';

@Resolver(() => PagerSubmissionModel)
export class SubmissionSearchResolver {
  constructor(
    private readonly formService: FormService,
    private readonly submissionService: SubmissionService,
  ) {
  }

  @Query(() => PagerSubmissionModel)
  async listSubmissions(
    @User() user: UserDocument,
    @Args('form', {type: () => ID}) id: string,
    @Args('start', {type: () => GraphQLInt, defaultValue: 0, nullable: true}) start,
    @Args('limit', {type: () => GraphQLInt, defaultValue: 50, nullable: true}) limit,
    @Context('cache') cache: ContextCache,
  ): Promise<PagerSubmissionModel> {
    const form = await this.formService.findById(id)

    const [submissions, total] = await this.submissionService.find(
      form,
      start,
      limit,
      {},
    )

    submissions.forEach(submission => cache.addSubmission(submission))

    return new PagerSubmissionModel(
      submissions.map(submission => new SubmissionModel(submission)),
      total,
      limit,
      start,
    )
  }
}
