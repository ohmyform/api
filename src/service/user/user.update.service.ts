import { Injectable } from '@nestjs/common';
import { UserUpdateInput } from '../../dto/user/user.update.input';
import { UserDocument } from '../../schema/user.schema';

@Injectable()
export class UserUpdateService {
  async update(user: UserDocument, input: UserUpdateInput): Promise<UserDocument> {
    if (input.firstName !== undefined) {
      user.set('firstName', input.firstName)
    }

    if (input.lastName !== undefined) {
      user.set('lastName', input.lastName)
    }

    if (input.email !== undefined) {
      user.set('email', input.email)
    }

    if (input.username !== undefined) {
      user.set('username', input.username)
    }

    if (input.roles !== undefined) {
      user.set('roles', input.roles)
    }

    if (input.language !== undefined) {
      user.set('language', input.language)
    }

    if (input.password !== undefined) {
      // user.set('language', input.language)
      // TODO password handling
    }

    await user.save()

    return user
  }
}
