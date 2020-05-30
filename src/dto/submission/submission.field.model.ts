import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SubmissionFieldDocument } from '../../schema/submission.field.schema';

@ObjectType('SubmissionField')
export class SubmissionFieldModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly value: string

  @Field()
  readonly type: string

  constructor(field: SubmissionFieldDocument) {
    this.id = field.id
    this.value = JSON.stringify(field.fieldValue)
    this.type = field.fieldType
  }
}
