import { SubmissionFieldResolver } from './submission.field.resolver';
import { SubmissionProgressResolver } from './submission.progress.resolver';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionSearchResolver } from './submission.search.resolver';
import { SubmissionSetFieldMutation } from './submission.set.field.mutation';
import { SubmissionStartMutation } from './submission.start.mutation';
import { SubmissionStatisticResolver } from './submission.statistic.resolver';

export const submissionResolvers = [
  SubmissionFieldResolver,
  SubmissionProgressResolver,
  SubmissionResolver,
  SubmissionSearchResolver,
  SubmissionSetFieldMutation,
  SubmissionStartMutation,
  SubmissionStatisticResolver,
]
