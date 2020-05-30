import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ButtonInput {
  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly action?: string

  @Field({ nullable: true })
  readonly text?: string

  @Field({ nullable: true })
  readonly bgColor?: string

  @Field({ nullable: true })
  readonly activeColor?: string

  @Field({ nullable: true })
  readonly color?: string
}
