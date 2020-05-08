import { Args, Context, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { DesignModel } from '../../dto/form/design.model';
import { FormModel } from '../../dto/form/form.model';
import { FormPageModel } from '../../dto/form/form.page.model';
import { RespondentNotificationsModel } from '../../dto/form/respondent.notifications.model';
import { SelfNotificationsModel } from '../../dto/form/self.notifications.model';
import { UserModel } from '../../dto/user/user.model';
import { UserDocument } from '../../schema/user.schema';
import { FormService } from '../../service/form/form.service';
import { ContextCache } from '../context.cache';

@Resolver(() => FormModel)
export class FormResolver {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @Query(() => FormModel)
  async getFormById(
    @User() user: UserDocument,
    @Args('id', {type: () => ID}) id,
    @Context('cache') cache: ContextCache,
  ) {
    const form = await this.formService.findById(id)

    if (!form.isLive && !await this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    cache.addForm(form)

    return new FormModel(form)
  }

  @ResolveField('isLive', () => Boolean)
  @Roles('admin')
  async getRoles(
    @User() user: UserDocument,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<boolean> {
    const form = await cache.getForm(parent.id)

    if (!await this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return form.isLive
  }

  @ResolveField('selfNotifications', () => SelfNotificationsModel)
  @Roles('admin')
  async getSelfNotifications(
    @User() user: UserDocument,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<SelfNotificationsModel> {
    const form = await cache.getForm(parent.id)

    if (!await this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return new SelfNotificationsModel(form.selfNotifications)
  }

  @ResolveField('respondentNotifications', () => SelfNotificationsModel)
  @Roles('admin')
  async getRespondentNotifications(
    @User() user: UserDocument,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<SelfNotificationsModel> {
    const form = await cache.getForm(parent.id)

    if (!await this.formService.isAdmin(form, user)) {
      throw new Error('no access to field')
    }

    return new RespondentNotificationsModel(form.respondentNotifications)
  }

  @ResolveField('design', () => DesignModel)
  async getDesign(
    @User() user: UserDocument,
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<DesignModel> {
    const form = await cache.getForm(parent.id)

    return new DesignModel(form.design)
  }

  @ResolveField('startPage', () => FormPageModel)
  async getStartPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormPageModel> {
    const form = await cache.getForm(parent.id)

    return new FormPageModel(form.startPage)
  }

  @ResolveField('endPage', () => FormPageModel)
  async getEndPage(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormPageModel> {
    const form = await cache.getForm(parent.id)

    return new FormPageModel(form.endPage)
  }

  @ResolveField('admin', () => UserModel)
  @Roles('superuser')
  async getAdmin(
    @Parent() parent: FormModel,
    @Context('cache') cache: ContextCache,
  ): Promise<UserModel> {
    const form = await cache.getForm(parent.id)

    if (!form.populated('admin')) {
      form.populate('admin')
      await form.execPopulate()
    }

    return new UserModel(form.admin)
  }
}
