import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Setting')
export class SettingModel {
  @Field(() => ID)
  readonly key: string

  @Field()
  readonly value: string

  @Field()
  readonly isTrue: boolean

  @Field()
  readonly isFalse: boolean

  constructor(key: string, value: string) {
    this.key = key
    this.value = value

    this.isTrue = value.toLowerCase() === 'true' || value === '1'
    this.isFalse = !this.isTrue
  }
}
