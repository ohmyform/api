import { Injectable } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthJwtModel } from '../../dto/auth/auth.jwt.model';
import { UserCreateInput } from '../../dto/user/user.create.input';
import { AuthService } from '../../service/auth/auth.service';
import { UserCreateService } from '../../service/user/user.create.service';

@Injectable()
export class AuthRegisterResolver {
  constructor(
    private readonly createUser: UserCreateService,
    private readonly auth: AuthService,
  ) {
  }

  @Mutation(() => AuthJwtModel)
  async authRegister(
    @Args({ name: 'user' }) data: UserCreateInput,
  ): Promise<AuthJwtModel> {
    const user = await this.createUser.create(data)

    return this.auth.login(user)
  }
}
