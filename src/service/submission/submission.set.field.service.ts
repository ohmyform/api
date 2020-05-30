import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import dayjs from 'dayjs';
import { Model } from 'mongoose';
import { SubmissionSetFieldInput } from '../../dto/submission/submission.set.field.input';
import { SubmissionFieldDocument, SubmissionFieldSchemaName } from '../../schema/submission.field.schema';
import { SubmissionDocument, SubmissionSchemaName } from '../../schema/submission.schema';

@Injectable()
export class SubmissionSetFieldService {
  constructor(
    @InjectModel(SubmissionSchemaName) private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(SubmissionFieldSchemaName) private readonly submissionFieldModel: Model<SubmissionFieldDocument>,
  ) {
  }

  async saveField(submission: SubmissionDocument, input: SubmissionSetFieldInput) {
    const existing = submission.fields.find(field => field.field.toString() === input.field)

    const data = JSON.parse(input.data)

    if (existing) {
      existing.set('fieldValue', data)
    } else {
      if (!submission.populated('form')) {
        submission.populate('form')
        await submission.execPopulate()
      }

      const field = submission.form.fields.find(field => field.id.toString() === input.field)

      const newField = new this.submissionFieldModel({
        field,
        fieldType: field.type,
        fieldValue: data
      })

      submission.set('percentageComplete', (1 + submission.fields.length) / submission.form.fields.length)
      submission.set('timeElapsed', dayjs().diff(dayjs(submission.created), 'second'))

      submission.set('fields', [
        ...submission.fields,
        newField,
      ])
    }

    await submission.save()
  }
}
