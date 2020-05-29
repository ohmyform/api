import { Field, ObjectType } from '@nestjs/graphql';
import { UserDocument } from '../../schema/user.schema';
import { UserModel } from './user.model';

@ObjectType('OwnUser')
export class OwnUserModel extends UserModel {
  @Field(() => [String])
  readonly roles: string[]

  constructor(user: UserDocument) {
    super(user)

    this.roles = user.roles
  }
}
