import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';
import { RatingFieldDocument } from '../../schema/embedded/rating.field';

@ObjectType('FormFieldRating')
export class FormFieldRatingModel {
  @Field(() => GraphQLInt, { nullable: true })
  readonly steps: number

  @Field({ nullable: true })
  readonly shape: string

  constructor(option: RatingFieldDocument) {
    this.steps = option.steps
    this.shape = option.shape
  }
}
