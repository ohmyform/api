import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PinoLogger } from 'nestjs-pino'
import { Repository } from 'typeorm'
import { rolesType } from '../../config/roles'
import { UserCreateInput } from '../../dto/user/user.create.input'
import { UserEntity } from '../../entity/user.entity'
import { PasswordService } from '../auth/password.service'
import { MailService } from '../mail.service'
import { SettingService } from '../setting.service'

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailerService: MailService,
    private readonly logger: PinoLogger,
    private readonly passwordService: PasswordService,
    private readonly settingService: SettingService,
  ) {
    logger.setContext(this.constructor.name)
  }

  private async getDefaultRoles(): Promise<rolesType> {
    const roleSetting = await this.settingService.getByKey('DEFAULT_ROLE')

    switch (roleSetting.value) {
      case 'superuser':
        return [
          'superuser',
          'admin',
          'user',
        ]

      case 'admin':
        return ['admin', 'user']
    }

    return ['user']
  }

  async create(input: UserCreateInput, roles?: rolesType): Promise<UserEntity> {
    if (undefined !== await this.userRepository.findOne({ username: input.username })) {
      throw new Error('username already in use')
    }

    if (undefined !== await this.userRepository.findOne({ email: input.email })) {
      throw new Error('email already in use')
    }

    let user = new UserEntity()

    user.provider = 'local'
    user.username = input.username
    user.email = input.email
    user.firstName = input.firstName
    user.lastName = input.lastName
    user.language = input.language ?? 'en'
    user.roles = roles ? roles : await this.getDefaultRoles()
    user.passwordHash = await this.passwordService.hash(input.password)

    user = await this.userRepository.save(user)

    const sent = await this.mailerService.send(
      user.email,
      'user/created',
      {
        username: user.username,
        confirm: 'https://www.google.com', // TODO confirm url
      }
    )

    // so send email
    if (!sent) {
      this.logger.warn('failed to send email for user creation')
    }

    return user
  }
}
