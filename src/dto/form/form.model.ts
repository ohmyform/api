import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FormDocument } from '../../schema/form.schema';

@ObjectType('Form')
export class FormModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field()
  readonly created: Date

  @Field({ nullable: true })
  readonly lastModified?: Date

  @Field()
  readonly language: string

  @Field()
  readonly showFooter: boolean

  constructor(form: FormDocument) {
    this.id = form.id
    this.title = form.title
    this.created = form.created
    this.lastModified = form.lastModified
    this.language = form.language
    this.showFooter = form.showFooter
  }
}
