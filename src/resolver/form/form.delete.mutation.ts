import { Injectable } from '@nestjs/common';
import { Args, ID, Mutation } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { FormModel } from '../../dto/form/form.model';
import { UserDocument } from '../../schema/user.schema';
import { FormDeleteService } from '../../service/form/form.delete.service';
import { FormService } from '../../service/form/form.service';

@Injectable()
export class FormDeleteMutation {
  constructor(
    private readonly deleteService: FormDeleteService,
    private readonly formService: FormService,
  ) {
  }

  @Mutation(() => FormModel)
  @Roles('admin')
  async deleteForm(
    @User() user: UserDocument,
    @Args({ name: 'id', type: () => ID}) id: string,
  ) {
    const form = await this.formService.findById(id)

    if (!form.isLive && !await this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    await this.deleteService.delete(id)

    return new FormModel(form)
  }
}
