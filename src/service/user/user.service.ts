import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaName } from '../../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
  ) {
  }

  async isSuperuser(user: UserDocument): Promise<boolean> {
    return user.roles.includes('superuser')
  }

  async find(start: number, limit: number, sort: any = {}): Promise<[UserDocument[], number]> {
    return [
      await this.userModel
        .find()
        .sort(sort)
        .skip(start)
        .limit(limit),
      await this.userModel
        .countDocuments()
    ]
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
    }).exec()

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      email,
    }).exec()

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }
}
