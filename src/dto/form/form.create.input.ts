import { Field, ID, InputType } from '@nestjs/graphql';
import { FormUpdateInput } from './form.update.input';

@InputType('FormCreateInput')
export class FormCreateInput extends FormUpdateInput {
  @Field(() => ID, { nullable: true })
  readonly id: string
}
