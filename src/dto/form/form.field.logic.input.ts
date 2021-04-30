import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class FormFieldLogicInput {
  @Field({ nullable: true })
  readonly formula: string

  @Field({ nullable: true })
  readonly action: string

  @Field(() => ID, { nullable: true })
  readonly jumpTo?: string

  @Field({ nullable: true })
  readonly visible?: boolean

  @Field({ nullable: true })
  readonly disable?: boolean

  @Field({ nullable: true })
  readonly require?: boolean

  @Field({ nullable: true })
  readonly enabled: boolean
}
