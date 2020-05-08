import { Field, InterfaceType } from '@nestjs/graphql';
import { Notifications } from '../../schema/form.schema';

@InterfaceType('Notification')
export class AbstractNotificationModel {
  @Field({ nullable: true })
  readonly subject?: string

  @Field({ nullable: true })
  readonly htmlTemplate?: string

  @Field()
  readonly enabled: boolean

  constructor(partial: Partial<Notifications>) {
    this.subject = partial.subject
    this.htmlTemplate = partial.htmlTemplate
    this.enabled = partial.enabled
  }
}
