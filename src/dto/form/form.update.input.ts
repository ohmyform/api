import { Field, ID, InputType } from '@nestjs/graphql';
import { DesignInput } from './design.input';
import { FormFieldInput } from './form.field.input';
import { PageInput } from './page.input';
import { RespondentNotificationsInput } from './respondent.notifications.input';
import { SelfNotificationsInput } from './self.notifications.input';

@InputType()
export class FormUpdateInput {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly title: string

  @Field({ nullable: true })
  readonly language: string

  @Field({ nullable: true })
  readonly showFooter: boolean

  @Field({ nullable: true })
  readonly isLive: boolean

  @Field(() => [FormFieldInput], { nullable: true })
  readonly fields: FormFieldInput[]

  @Field({ nullable: true })
  readonly design: DesignInput

  @Field({ nullable: true })
  readonly startPage: PageInput

  @Field({ nullable: true })
  readonly endPage: PageInput

  @Field({ nullable: true })
  readonly selfNotifications: SelfNotificationsInput

  @Field({ nullable: true })
  readonly respondentNotifications: RespondentNotificationsInput
}
