import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FormDocument } from '../../schema/form.schema';
import { SubmissionDocument, SubmissionSchemaName } from '../../schema/submission.schema';
import { SubmissionTokenService } from './submission.token.service';

export class SubmissionService {
  constructor(
    @InjectModel(SubmissionSchemaName) private readonly submissionModel: Model<SubmissionDocument>,
    private readonly tokenService: SubmissionTokenService
  ) {
  }

  async isOwner(submission: SubmissionDocument, token: string): Promise<boolean> {
    return await this.tokenService.verify(token, submission.tokenHash)
  }

  async find(form: FormDocument, start: number, limit: number, sort: any = {}): Promise<[SubmissionDocument[], number]> {
    const conditions: FilterQuery<SubmissionDocument> = {
      form
    }

    return [
      await this.submissionModel
        .find(conditions)
        .sort(sort)
        .skip(start)
        .limit(limit),
      await this.submissionModel
        .countDocuments(conditions)
    ]
  }

  async findById(id: string): Promise<SubmissionDocument> {
    const submission = await this.submissionModel.findById(id);

    if (!submission) {
      throw new Error('no form found')
    }

    return submission
  }
}
