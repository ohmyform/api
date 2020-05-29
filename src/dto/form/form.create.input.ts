import { Field, ID, InputType } from '@nestjs/graphql';
import { FormFieldInput } from './form.field.input';

@InputType('FormCreateInput')
export class FormCreateInput {
  @Field(() => ID, { nullable: true })
  readonly id: string

  @Field()
  readonly title: string

  @Field()
  readonly language: string

  @Field()
  readonly showFooter: boolean

  @Field()
  readonly isLive: boolean

  @Field(() => [FormFieldInput], { nullable: true })
  readonly fields: FormFieldInput[]
}
