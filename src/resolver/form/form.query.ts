import { Args, Context, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { DesignModel } from '../../dto/form/design.model'
import { FormFieldModel } from '../../dto/form/form.field.model'
import { FormHookModel } from '../../dto/form/form.hook.model'
import { FormModel } from '../../dto/form/form.model'
import { FormNotificationModel } from '../../dto/form/form.notification.model'
import { PageModel } from '../../dto/form/page.model'
import { UserModel } from '../../dto/user/user.model'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { ContextCache } from '../context.cache'

@Resolver(() => FormModel)
export class FormQuery {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @Query(() => FormModel)
  async getFormById(
    @User() user: UserEntity,
    @Args('id', {type: () => ID}) id,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    const form = await this.formService.findById(id)

    if (!form.isLive && !await this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    cache.add(cache.getCacheKey(FormEntity.name, form.id), form)

    return new FormModel(form)
  }
}
