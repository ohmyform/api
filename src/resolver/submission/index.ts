import { SubmissionProgressResolver } from './submission.progress.resolver';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionSearchResolver } from './submission.search.resolver';
import { SubmissionSetFieldMutation } from './submission.set.field.mutation';
import { SubmissionStartMutation } from './submission.start.mutation';

export const submissionResolvers = [
  SubmissionProgressResolver,
  SubmissionResolver,
  SubmissionSetFieldMutation,
  SubmissionStartMutation,
  SubmissionSearchResolver,
]
