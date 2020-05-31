import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmissionDocument, SubmissionSchemaName } from '../../schema/submission.schema';

export class SubmissionStatisticService {
  constructor(
    @InjectModel(SubmissionSchemaName) private readonly submissionModel: Model<SubmissionDocument>,
  ) {
  }

  async getTotal(): Promise<number> {
    return await this.submissionModel.estimatedDocumentCount();
  }
}
