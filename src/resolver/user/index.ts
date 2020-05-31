import { UserDeleteMutation } from './user.delete.mutation';
import { UserResolver } from './user.resolver';
import { UserSearchResolver } from './user.search.resolver';
import { UserStatisticResolver } from './user.statistic.resolver';
import { UserUpdateMutation } from './user.update.mutation';

export const userResolvers = [
  UserDeleteMutation,
  UserResolver,
  UserSearchResolver,
  UserStatisticResolver,
  UserUpdateMutation,
]
