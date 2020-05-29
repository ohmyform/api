import { Injectable } from '@nestjs/common';
import { Args, Context, Mutation } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { FormCreateInput } from '../../dto/form/form.create.input';
import { FormModel } from '../../dto/form/form.model';
import { UserDocument } from '../../schema/user.schema';
import { FormCreateService } from '../../service/form/form.create.service';
import { ContextCache } from '../context.cache';

@Injectable()
export class FormCreateMutation {
  constructor(
    private readonly createService: FormCreateService
  ) {
  }

  @Mutation(() => FormModel)
  @Roles('admin')
  async createForm(
    @User() user: UserDocument,
    @Args({ name: 'form', type: () => FormCreateInput }) input: FormCreateInput,
    @Context('cache') cache: ContextCache,
  ): Promise<FormModel> {
    const form = await this.createService.create(user, input)

    cache.addForm(form)

    return new FormModel(form)
  }
}
