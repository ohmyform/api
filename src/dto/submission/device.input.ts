import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeviceInput {
  @Field()
  readonly type: string

  @Field()
  readonly name: string
}
