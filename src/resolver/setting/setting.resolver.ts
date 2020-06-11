import {Injectable} from '@nestjs/common'
import {Args, ID, Query} from '@nestjs/graphql'
import {Roles} from '../../decorator/roles.decorator'
import {User} from '../../decorator/user.decorator'
import {PagerSettingModel} from '../../dto/setting/pager.setting.model'
import {SettingModel} from '../../dto/setting/setting.model'
import {UserDocument} from '../../schema/user.schema'
import {SettingService} from '../../service/setting.service'

@Injectable()
export class SettingResolver {
  constructor(
    private readonly settingService: SettingService,
  ) {
  }

  @Query(() => PagerSettingModel)
  @Roles('superuser')
  async getSettings(): Promise<PagerSettingModel> {
    // TODO https://github.com/ohmyform/api/issues/3
    return new PagerSettingModel(
      [],
      0,
      0,
      0,
    )
  }

  @Query(() => SettingModel)
  async getSetting(
    @Args('key', {type: () => ID}) key: string,
    @User() user: UserDocument,
  ): Promise<SettingModel> {
    if (!this.settingService.isPublicKey(key) && !user.roles.includes('superuser')) {
      throw new Error(`no access to key ${key}`)
    }

    return await this.settingService.getByKey(key)
  }
}
