import { UserCreateService } from './user.create.service';
import { UserDeleteService } from './user.delete.service';
import { UserService } from './user.service';
import { UserStatisticService } from './user.statistic.service';
import { UserUpdateService } from './user.update.service';

export const userServices = [
  UserCreateService,
  UserDeleteService,
  UserService,
  UserStatisticService,
  UserUpdateService,
]
