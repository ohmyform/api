import { Field, InputType } from '@nestjs/graphql';

@InputType('NotificationInput', { isAbstract: true })
export class AbstractNotificationInput {
  @Field({ nullable: true })
  readonly subject?: string

  @Field({ nullable: true })
  readonly htmlTemplate?: string

  @Field()
  readonly enabled: boolean
}
