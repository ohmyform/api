import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';
import { SubmissionDocument, SubmissionSchemaName } from '../../schema/submission.schema';

@Injectable()
export class FormDeleteService {
  constructor(
    @InjectModel(FormSchemaName) private formModel: Model<FormDocument>,
    @InjectModel(SubmissionSchemaName) private readonly submissionModel: Model<SubmissionDocument>,
  ) {
  }

  async delete(id: string): Promise<void> {
    const form = await this.formModel.findByIdAndDelete(id).exec()
    await this.submissionModel.deleteMany({
      form
    }).exec()
  }
}
