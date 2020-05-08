import { Field, ObjectType } from '@nestjs/graphql';
import { SelfNotifications } from '../../schema/form.schema';
import { AbstractNotificationModel } from './abstract.notification.model';

@ObjectType({
  implements: [AbstractNotificationModel],
})
export class SelfNotificationsModel extends AbstractNotificationModel {
  @Field({ nullable: true })
  readonly fromField?: string

  @Field({ nullable: true })
  readonly toEmail?: string

  constructor(partial: Partial<SelfNotifications>) {
    super(partial);

    this.fromField = partial.fromField
    this.toEmail = partial.toEmail
  }
}
