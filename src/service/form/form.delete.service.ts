import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';

@Injectable()
export class FormDeleteService {
  constructor(
    @InjectModel(FormSchemaName) private formModel: Model<FormDocument>,
  ) {
  }

  async delete(id: string): Promise<void> {
    // TODO
    throw new Error('form.delete not yet implemented')
  }
}
