import { Field, ObjectType } from '@nestjs/graphql'
import { ColorsEmbedded } from '../../entity/embedded/colors.embedded'

@ObjectType('Colors')
export class ColorsModel {
  @Field()
  readonly background: string

  @Field()
  readonly question: string

  @Field()
  readonly answer: string

  @Field()
  readonly button: string

  @Field()
  readonly buttonActive: string

  @Field()
  readonly buttonText: string

  constructor(partial: Partial<ColorsEmbedded>) {
    this.background = partial.background
    this.question = partial.question
    this.answer = partial.answer
    this.button = partial.button
    this.buttonActive = partial.buttonActive
    this.buttonText = partial.buttonText
  }
}
