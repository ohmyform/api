import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FormFieldDocument } from '../../schema/form.field.schema';

@ObjectType('FormField')
export class FormFieldModel {
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

  constructor(document: FormFieldDocument) {
    this.id = document.id
    this.title = document.title
    this.type = document.type
    this.description = document.description
    this.required = document.required
    this.value = document.value
  }
}
