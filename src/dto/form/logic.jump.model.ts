import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LogicJumpDocument } from '../../schema/embedded/logic.jump';

@ObjectType('LogicJump')
export class LogicJumpModel {
  @Field(() => ID, { nullable: true })
  readonly fieldA: string

  @Field({ nullable: true })
  readonly valueB: string

  @Field({ nullable: true })
  readonly expressionString: string

  @Field(() => ID, { nullable: true })
  readonly jumpTo: string

  @Field()
  readonly enabled: boolean

  constructor(document: LogicJumpDocument) {
    if (!document) {
      this.enabled = false
      return
    }

    this.fieldA = document.fieldA
    this.valueB = document.valueB
    this.expressionString = document.expressionString
    this.jumpTo = document.jumpTo
    this.enabled = !!document.enabled
  }
}
