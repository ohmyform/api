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

  constructor(partial: Partial<FormDocument>) {
    this.id = partial.id
    this.title = partial.title
    this.created = partial.created
    this.lastModified = partial.lastModified
    this.language = partial.language
    this.showFooter = partial.showFooter
  }
}
