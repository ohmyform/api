import { Field, InputType } from '@nestjs/graphql';

@InputType('ColorsInput')
export class ColorsInput {
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
}
