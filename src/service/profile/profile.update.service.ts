import { Injectable } from '@nestjs/common';
import { ProfileUpdateInput } from '../../dto/profile/profile.update.input';
import { UserDocument } from '../../schema/user.schema';

@Injectable()
export class ProfileUpdateService {
  async update(user: UserDocument, input: ProfileUpdateInput): Promise<UserDocument> {
    if (input.firstName !== undefined) {
      user.set('firstName', input.firstName)
    }

    if (input.lastName !== undefined) {
      user.set('lastName', input.lastName)
    }

    if (input.email !== undefined) {
      user.set('email', input.email)
      // TODO request email verification
    }

    if (input.username !== undefined) {
      user.set('username', input.username)
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
