import { Injectable } from '@nestjs/common';
import { Args, Context, Mutation } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { FormModel } from '../../dto/form/form.model';
import { FormUpdateInput } from '../../dto/form/form.update.input';
import { UserDocument } from '../../schema/user.schema';
import { FormService } from '../../service/form/form.service';
import { FormUpdateService } from '../../service/form/form.update.service';
import { ContextCache } from '../context.cache';

@Injectable()
export class FormUpdateMutation {
  constructor(
    private readonly updateService: FormUpdateService,
    private readonly formService: FormService,
  ) {
  }

  @Mutation(() => FormModel)
  @Roles('admin')
  async updateForm(
    @User() user: UserDocument,
    @Args({ name: 'form', type: () => FormUpdateInput }) input: FormUpdateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    const form = await this.formService.findById(input.id)

    if (!form.isLive && !await this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    await this.updateService.update(form, input)

    cache.addForm(form)

    return new FormModel(form)
  }
}
