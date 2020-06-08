import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {SettingModel} from '../dto/setting/setting.model'

@Injectable()
export class SettingService {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  async getByKey(key: string): Promise<SettingModel> {
    switch (key) {
      case 'SIGNUP_DISABLED':
        return new SettingModel(key, this.configService.get(key))
    }

    throw new Error(`no config stored for key ${key}`)
  }

  async isTrue(key: string): Promise<boolean> {
    return (await this.getByKey(key)).isTrue
  }

  async isFalse(key: string): Promise<boolean> {
    return (await this.getByKey(key)).isFalse
  }
}
