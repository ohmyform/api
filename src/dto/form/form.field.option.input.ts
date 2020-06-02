import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FormFieldOptionInput {
  @Field({ nullable: true })
  readonly key: string

  @Field({ nullable: true })
  readonly title: string

  @Field()
  readonly value: string
}
