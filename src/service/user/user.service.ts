import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaName } from '../../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
  ) {
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }

  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      username,
    })

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }
}
