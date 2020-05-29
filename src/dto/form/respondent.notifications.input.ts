import { Field, InputType } from '@nestjs/graphql';
import { AbstractNotificationInput } from './abstract.notification.input';

@InputType()
export class RespondentNotificationsInput extends AbstractNotificationInput {
  @Field({ nullable: true })
  readonly toField?: string

  @Field({ nullable: true })
  readonly fromEmail?: string
}
