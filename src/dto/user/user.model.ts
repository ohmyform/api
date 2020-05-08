import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDocument } from '../../schema/user.schema';

@ObjectType('User')
export class UserModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly username: string

  @Field()
  readonly email: string

  @Field()
  readonly language: string

  @Field()
  readonly firstName?: string

  @Field()
  readonly lastName?: string

  constructor(user: Partial<UserDocument>) {
    this.id = user.id
    this.username = user.username
    this.email = user.email

    this.language = user.language
    this.firstName = user.firstName
    this.lastName = user.lastName
  }
}
