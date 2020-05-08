import { Field, ObjectType } from '@nestjs/graphql';
import { Colors } from '../../schema/form.schema';

@ObjectType('Colors')
export class ColorsModel {
  @Field()
  readonly backgroundColor: string

  @Field()
  readonly questionColor: string

  @Field()
  readonly answerColor: string

  @Field()
  readonly buttonColor: string

  @Field()
  readonly buttonTextColor: string

  constructor(partial: Partial<Colors>) {
    this.backgroundColor = partial.backgroundColor
    this.questionColor = partial.questionColor
    this.answerColor = partial.answerColor
    this.buttonColor = partial.buttonColor
    this.buttonTextColor = partial.buttonTextColor
  }
}
