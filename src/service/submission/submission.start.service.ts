import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmissionStartInput } from '../../dto/submission/submission.start.input';
import { FormDocument } from '../../schema/form.schema';
import { SubmissionDocument, SubmissionSchemaName } from '../../schema/submission.schema';
import { UserDocument } from '../../schema/user.schema';
import { SubmissionTokenService } from './submission.token.service';

@Injectable()
export class SubmissionStartService {
  constructor(
    @InjectModel(SubmissionSchemaName) private submissionModel: Model<SubmissionDocument>,
    private readonly tokenService: SubmissionTokenService
  ) {
  }

  async start(
    form: FormDocument,
    input: SubmissionStartInput,
    user?: UserDocument,
  ): Promise<SubmissionDocument> {
    const data: any = {
      form,
      device: input.device,
      tokenHash: await this.tokenService.hash(input.token)
    }

    if (user) {
      data.user = user
    }

    return await this.submissionModel.create(data)
  }
}
