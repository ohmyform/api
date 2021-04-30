import { SettingMutation } from './setting.mutation'
import { SettingResolver } from './setting.resolver'

export const settingsResolvers = [
  SettingResolver,
  SettingMutation,
]
