import { Field, ObjectType } from '@nestjs/graphql';
import { Device } from '../../schema/submission.schema';

@ObjectType('Device')
export class DeviceModel {
  @Field()
  readonly type: string

  @Field()
  readonly name: string

  constructor(device: Device) {
    this.type = device.type
    this.name = device.name
  }
}
