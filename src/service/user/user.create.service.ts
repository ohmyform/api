import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino/dist';
import { UserCreateInput } from '../../dto/user/user.create.input';
import { UserDocument, UserSchemaName } from '../../schema/user.schema';
import { PasswordService } from '../auth/password.service';
import { MailService } from '../mail.service';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
    private readonly mailerService: MailService,
    private readonly logger: PinoLogger,
    private readonly passwordService: PasswordService,
  ) {}

  async create(user: UserCreateInput): Promise<UserDocument> {
    // TODO check for uniqueness of email & username!

    const entry = new this.userModel({
      ...user,
      passwordHash: await this.passwordService.hash(user.password),
    })

    await entry.save({
      validateBeforeSave: true,
    })

    const sent = await this.mailerService.send(
      entry.email,
      'user/created',
      {
        username: entry.username,
        confirm: 'https://www.google.com', // TODO confirm url
      }
    )

    // so send email
    if (!sent) {
      this.logger.warn('failed to send email for user creation')
    }

    return entry
  }
}
