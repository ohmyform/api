import { Field, ObjectType } from '@nestjs/graphql';
import { FormPage } from '../../schema/form.schema';
import { ButtonModel } from './button.model';

@ObjectType('Page')
export class PageModel {
  @Field()
  readonly show: boolean

  @Field({ nullable: true })
  readonly title?: string

  @Field({ nullable: true })
  readonly paragraph?: string

  @Field({ nullable: true })
  readonly buttonText?: string

  @Field(() => [ButtonModel])
  readonly buttons: ButtonModel[]

  constructor(page: Partial<FormPage>) {
    this.show = page.show
    this.title = page.title
    this.paragraph = page.paragraph
    this.buttonText = page.buttonText
    this.buttons = page.buttons.map(button => new ButtonModel(button))
  }
}
