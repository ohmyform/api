import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormCreateInput } from '../../dto/form/form.create.input';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';
import { UserDocument } from '../../schema/user.schema';

@Injectable()
export class FormCreateService {
  constructor(
    @InjectModel(FormSchemaName) private readonly formModel: Model<FormDocument>,
  ) {
  }

  async create(admin: UserDocument, input: FormCreateInput): Promise<FormDocument> {
    return await this.formModel.create({
      admin,
      ...input,
    })
  }
}

