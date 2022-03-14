import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { FormFieldLogicModel } from './form.field.logic.model'
import { FormFieldOptionModel } from './form.field.option.model'
import { FormFieldRatingModel } from './form.field.rating.model'

@ObjectType('FormField')
export class FormFieldModel {
  readonly _id: number

  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field({ nullable: true })
  readonly slug?: string

  @Field({ nullable: true })
  readonly idx: number

  @Field()
  readonly type: string

  @Field()
  readonly description: string

  @Field()
  readonly required: boolean

  @Field({ nullable: true })
  readonly defaultValue: string

  @Field(() => [FormFieldOptionModel])
  readonly options: FormFieldOptionModel[]

  @Field(() => [FormFieldLogicModel])
  readonly logic: FormFieldLogicModel[]

  @Field(() => FormFieldRatingModel, { nullable: true })
  readonly rating: FormFieldRatingModel

  constructor(id: string, document: FormFieldEntity) {
    this._id = document.id
    this.id = id
    this.idx = document.idx
    this.title = document.title
    this.slug = document.slug
    this.type = document.type
    this.description = document.description
    this.required = document.required
    this.defaultValue = document.defaultValue
    this.options = document.options?.map(option => new FormFieldOptionModel(option)) || []
    this.logic = document.logic?.map(logic => new FormFieldLogicModel(logic)) || []
    this.rating = document.rating ? new FormFieldRatingModel(document.rating) : null
  }
}
