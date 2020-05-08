import { authServices } from './auth';
import { formResolvers } from './form';
import { myResolvers } from './me';
import { StatusResolver } from './status.resolver';
import { userResolvers } from './user';

export const resolvers = [
  StatusResolver,
  ...userResolvers,
  ...authServices,
  ...myResolvers,
  ...formResolvers,
]
