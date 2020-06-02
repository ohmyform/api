import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class LogicJumpInput {
  @Field(() => ID, { nullable: true })
  readonly fieldA: string

  @Field({ nullable: true })
  readonly valueB: string

  @Field({ nullable: true })
  readonly expressionString: string

  @Field(() => ID, { nullable: true })
  readonly jumpTo: string

  @Field({ nullable: true })
  readonly enabled: boolean
}
