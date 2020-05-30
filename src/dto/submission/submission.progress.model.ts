import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SubmissionDocument } from '../../schema/submission.schema';

@ObjectType('SubmissionProgress')
export class SubmissionProgressModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly timeElapsed: number

  @Field()
  readonly percentageComplete: number

  @Field()
  readonly created: Date

  @Field({ nullable: true })
  readonly lastModified?: Date

  constructor(submission: Partial<SubmissionDocument>) {
    this.id = submission.id

    this.timeElapsed = submission.timeElapsed
    this.percentageComplete = submission.percentageComplete

    this.created = submission.created
    this.lastModified = submission.lastModified
  }
}
