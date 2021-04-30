import { BootService } from './boot.service'
import { UserCreateService } from './user.create.service'
import { UserDeleteService } from './user.delete.service'
import { UserService } from './user.service'
import { UserStatisticService } from './user.statistic.service'
import { UserUpdateService } from './user.update.service'

export const userServices = [
  BootService,
  UserCreateService,
  UserDeleteService,
  UserService,
  UserStatisticService,
  UserUpdateService,
]
