import { Field, ObjectType } from '@nestjs/graphql';
import { RespondentNotifications } from '../../schema/form.schema';
import { AbstractNotificationModel } from './abstract.notification.model';

@ObjectType({
  implements: [AbstractNotificationModel],
})
export class RespondentNotificationsModel extends AbstractNotificationModel {
  @Field({ nullable: true })
  readonly toField?: string

  @Field({ nullable: true })
  readonly fromEmail?: string

  constructor(partial: Partial<RespondentNotifications>) {
    super(partial);

    this.toField = partial.toField
    this.fromEmail = partial.fromEmail
  }
}
