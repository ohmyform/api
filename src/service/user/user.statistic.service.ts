import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaName } from '../../schema/user.schema';

export class UserStatisticService {
  constructor(
    @InjectModel(UserSchemaName) private userModel: Model<UserDocument>,
  ) {
  }

  async getTotal(): Promise<number> {
    return await this.userModel.estimatedDocumentCount();
  }
}
