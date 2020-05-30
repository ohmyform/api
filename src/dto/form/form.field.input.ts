import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FormFieldInput {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field()
  readonly type: string

  @Field()
  readonly description: string

  @Field()
  readonly required: boolean

  @Field()
  readonly value: string
}
