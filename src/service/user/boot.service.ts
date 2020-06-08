import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino/dist';
import { UserCreateService } from './user.create.service';
import { UserService } from './user.service';

@Injectable()
export class BootService implements OnApplicationBootstrap {
  constructor(
    private readonly createService: UserCreateService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
  }

  async onApplicationBootstrap(): Promise<void> {
    const create = this.configService.get<string>('CREATE_ADMIN', 'false')

    if (!create || ['false', '0', 'no', ''].includes(create.toLowerCase())) {
      return
    }

    this.logger.warn('admin user check is still enabled! once your use has been created this should be disabled')

    const username = this.configService.get<string>('ADMIN_USERNAME', 'root')
    const email = this.configService.get<string>('ADMIN_EMAIL', 'admin@ohmyform.com')
    const password = this.configService.get<string>('ADMIN_PASSWORD', 'root')

    try {
      await this.userService.findByUsername(username)

      this.logger.info('username already exists, skip creating')
      return
    } catch (e) {}

    try {
      await this.userService.findByEmail(email)

      this.logger.info('email already exists, skip creating')
      return
    } catch (e) {}

    const user = await this.createService.create({
      username,
      email,
      password,
    })

    user.set('roles', ['user', 'admin', 'superuser'])
    try {
      await user.save()
    } catch (e) {
      this.logger.error('could not create admin user')
    }

    this.logger.info('new root user created')
  }
}
