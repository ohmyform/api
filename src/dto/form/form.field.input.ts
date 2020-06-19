import { Field, ID, InputType } from '@nestjs/graphql';
import { FormFieldOptionInput } from './form.field.option.input';
import { FormFieldRatingInput } from './form.field.rating.input';
import { LogicJumpInput } from './logic.jump.input';
import { LogicJumpModel } from './logic.jump.model';

@InputType()
export class FormFieldInput {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field()
  readonly type: string

  @Field({ nullable: true })
  readonly slug?: string

  @Field()
  readonly description: string

  @Field()
  readonly required: boolean

  @Field()
  readonly value: string

  @Field(() => [FormFieldOptionInput], { nullable: true })
  readonly options: [FormFieldOptionInput]

  @Field(() => LogicJumpInput, { nullable: true })
  readonly logicJump: LogicJumpModel

  @Field(() => FormFieldRatingInput, { nullable: true })
  readonly rating: FormFieldRatingInput
}
