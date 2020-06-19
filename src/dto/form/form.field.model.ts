import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FormFieldDocument } from '../../schema/form.field.schema';
import { FormFieldOptionModel } from './form.field.option.model';
import { FormFieldRatingModel } from './form.field.rating.model';
import { LogicJumpModel } from './logic.jump.model';

@ObjectType('FormField')
export class FormFieldModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field({ nullable: true })
  readonly slug?: string

  @Field()
  readonly type: string

  @Field()
  readonly description: string

  @Field()
  readonly required: boolean

  @Field()
  readonly value: string

  @Field(() => [FormFieldOptionModel])
  readonly options: [FormFieldOptionModel]

  @Field(() => LogicJumpModel)
  readonly logicJump: LogicJumpModel

  @Field(() => FormFieldRatingModel, { nullable: true })
  readonly rating: FormFieldRatingModel

  constructor(document: FormFieldDocument) {
    this.id = document.id
    this.title = document.title
    this.slug = document.slug
    this.type = document.type
    this.description = document.description
    this.required = document.required
    this.value = document.value
    this.options = document.options ? document.options.map(option => new FormFieldOptionModel(option)) : []
    this.logicJump = new LogicJumpModel(document.logicJump)
    this.rating = document.rating ? new FormFieldRatingModel(document.rating) : null
  }
}
