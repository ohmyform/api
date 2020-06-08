import {Roles} from '../../decorator/roles.decorator'

export class SettingMutation {
  @Roles('superuser')
  setSetting(key: string, value: string) {
    // TODO https://github.com/ohmyform/api/issues/3
  }
}
