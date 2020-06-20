import { SubmissionService } from './submission.service';
import { SubmissionSetFieldService } from './submission.set.field.service';
import { SubmissionStartService } from './submission.start.service';
import { SubmissionStatisticService } from './submission.statistic.service';
import { SubmissionTokenService } from './submission.token.service';
import { SubmissionHookService } from './submission.hook.service'

export const submissionServices = [
  SubmissionService,
  SubmissionSetFieldService,
  SubmissionStartService,
  SubmissionStatisticService,
  SubmissionTokenService,
  SubmissionHookService,
]
