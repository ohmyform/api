import { Injectable } from '@nestjs/common';
import { Args, Context, ID, Mutation } from '@nestjs/graphql';
import { User } from '../../decorator/user.decorator';
import { SubmissionProgressModel } from '../../dto/submission/submission.progress.model';
import { SubmissionStartInput } from '../../dto/submission/submission.start.input';
import { UserDocument } from '../../schema/user.schema';
import { FormService } from '../../service/form/form.service';
import { SubmissionStartService } from '../../service/submission/submission.start.service';
import { ContextCache } from '../context.cache';

@Injectable()
export class SubmissionStartMutation {
  constructor(
    private readonly startService: SubmissionStartService,
    private readonly formService: FormService,
  ) {
  }

  @Mutation(() => SubmissionProgressModel)
  async submissionStart(
    @User() user: UserDocument,
    @Args({ name: 'form', type: () => ID }) id: string,
    @Args({ name: 'submission', type: () => SubmissionStartInput }) input: SubmissionStartInput,
    @Context('cache') cache: ContextCache,
  ): Promise<SubmissionProgressModel> {
    const form = await this.formService.findById(id)

    const submission = await this.startService.start(form, input, user)

    cache.addSubmission(submission)

    return new SubmissionProgressModel(submission)
  }
}
