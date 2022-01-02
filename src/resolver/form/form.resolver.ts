import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
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
export class FormResolver {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @ResolveField('fields', () => [FormFieldModel])
  async getFields(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return form.fields?.map(field => new FormFieldModel(field)) || []
  }

  @ResolveField('hooks', () => [FormHookModel])
  async getHooks(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormHookModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return form.hooks?.map(hook => new FormHookModel(hook)) || []
  }

  @ResolveField('isLive', () => Boolean)
  @Roles('admin')
  async getRoles(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<boolean> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    if (!this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return form.isLive
  }

  @ResolveField('notifications', () => [FormNotificationModel])
  @Roles('admin')
  async getNotifications(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormNotificationModel[]> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    if (!this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return form.notifications?.map(notification => new FormNotificationModel(notification)) || []
  }

  @ResolveField('design', () => DesignModel)
  async getDesign(
    @User() user: UserEntity,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<DesignModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return new DesignModel(form.design)
  }

  @ResolveField('startPage', () => PageModel)
  async getStartPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<PageModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return new PageModel(form.startPage)
  }

  @ResolveField('endPage', () => PageModel)
  async getEndPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<PageModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    return new PageModel(form.endPage)
  }

  @ResolveField('admin', () => UserModel, { nullable: true })
  @Roles('admin')
  async getAdmin(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    const form = await cache.get<FormEntity>(cache.getCacheKey(FormEntity.name, parent.id))

    if (!form.admin) {
      return null
    }

    return new UserModel(form.admin)
  }
}
