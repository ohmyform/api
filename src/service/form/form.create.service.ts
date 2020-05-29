import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormCreateInput } from '../../dto/form/form.create.input';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';
import { UserDocument } from '../../schema/user.schema';
import { FormUpdateService } from './form.update.service';

@Injectable()
export class FormCreateService {
  constructor(
    @InjectModel(FormSchemaName) private readonly formModel: Model<FormDocument>,
    private readonly updateService: FormUpdateService,
  ) {
  }

  async create(admin: UserDocument, input: FormCreateInput): Promise<FormDocument> {
    const form = await this.formModel.create({
      admin
    })

    return await this.updateService.update(form, input)
  }
}
