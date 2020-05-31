import { Injectable } from '@nestjs/common';
import { Args, ID, Mutation } from '@nestjs/graphql';
import { Roles } from '../../decorator/roles.decorator';
import { User } from '../../decorator/user.decorator';
import { DeletedModel } from '../../dto/deleted.model';
import { UserDocument } from '../../schema/user.schema';
import { UserDeleteService } from '../../service/user/user.delete.service';

@Injectable()
export class UserDeleteMutation {
  constructor(
    private readonly deleteService: UserDeleteService,
  ) {
  }

  @Mutation(() => DeletedModel)
  @Roles('admin')
  async deleteUser(
    @User() auth: UserDocument,
    @Args({ name: 'id', type: () => ID}) id: string,
  ): Promise<DeletedModel> {
    if (auth.id === id) {
      throw new Error('cannot delete your own user')
    }

    await this.deleteService.delete(id)

    return new DeletedModel(id)
  }
}
