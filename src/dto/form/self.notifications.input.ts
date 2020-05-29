import { Field, InputType } from '@nestjs/graphql';
import { AbstractNotificationInput } from './abstract.notification.input';

@InputType()
export class SelfNotificationsInput extends AbstractNotificationInput {
  @Field({ nullable: true })
  readonly fromField?: string

  @Field({ nullable: true })
  readonly toEmail?: string
}
