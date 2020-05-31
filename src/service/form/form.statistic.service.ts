import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';

export class FormStatisticService {
  constructor(
    @InjectModel(FormSchemaName) private formModel: Model<FormDocument>,
  ) {
  }

  async getTotal(): Promise<number> {
    return await this.formModel.estimatedDocumentCount();
  }
}
