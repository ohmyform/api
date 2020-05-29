import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';
import { UserDocument } from '../../schema/user.schema';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(FormSchemaName) private formModel: Model<FormDocument>,
  ) {
  }

  async isAdmin(form: FormDocument, user: UserDocument): Promise<boolean> {
    if (user.roles.includes('superuser')) {
      return true
    }

    return Types.ObjectId(form.admin.id).equals(Types.ObjectId(user.id))
  }

  async find(user: UserDocument, start: number, limit: number, sort: any = {}): Promise<[FormDocument[], number]> {
    const qb = this.formModel.find()

    // TODO apply restrictions based on user!

    return [
      await qb.sort(sort)
        .skip(start)
        .limit(limit),
      await qb.count()
    ]
  }

  async findById(id: string): Promise<FormDocument> {
    const form = await this.formModel.findById(id);

    if (!form) {
      throw new Error('no form found')
    }

    return form
  }
}
