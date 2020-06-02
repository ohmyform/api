import { Field, ObjectType } from '@nestjs/graphql';
import { FieldOptionDocument } from '../../schema/embedded/field.option';

@ObjectType('FormFieldOption')
export class FormFieldOptionModel {
  @Field({ nullable: true })
  readonly key: string

  @Field({ nullable: true })
  readonly title: string

  @Field()
  readonly value: string

  constructor(option: FieldOptionDocument) {
    this.key = option.key
    this.title = option.title
    this.value = option.value
  }
}
