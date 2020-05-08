import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType('OwnUser')
export class OwnUserModel extends UserModel {
  @Field(() => [String])
  readonly roles: string[]
}
