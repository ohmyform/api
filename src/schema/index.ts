import { FormFieldDefinition } from './form.field.schema';
import { FormHookDefinition } from './form.hook.schema'
import { FormDefinition } from './form.schema';
import { SubmissionFieldDefinition } from './submission.field.schema';
import { SubmissionDefinition } from './submission.schema';
import { UserDefinition } from './user.schema';

export const schema = [
  FormDefinition,
  FormFieldDefinition,
  FormHookDefinition,
  SubmissionDefinition,
  SubmissionFieldDefinition,
  UserDefinition,
]
