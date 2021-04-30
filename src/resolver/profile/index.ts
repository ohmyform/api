import { ProfileResolver } from './profile.resolver'
import { ProfileUpdateMutation } from './profile.update.mutation'

export const profileResolvers = [
  ProfileResolver,
  ProfileUpdateMutation,
]
