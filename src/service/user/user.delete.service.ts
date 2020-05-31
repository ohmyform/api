import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaName } from '../../schema/user.schema';

@Injectable()
export class UserDeleteService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
  ) {
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec()
  }
}
