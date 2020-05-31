import { Field, ID, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class UserUpdateInput {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly username: string

  @Field({ nullable: true })
  readonly email: string

  @Field({ nullable: true })
  readonly firstName: string

  @Field({ nullable: true })
  readonly lastName: string

  @Field({ nullable: true })
  readonly password: string

  @Field(() => [GraphQLString], { nullable: true })
  readonly roles: string[]

  @Field({ nullable: true })
  readonly language: string
}
