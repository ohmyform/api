import { HttpService, Injectable } from '@nestjs/common'
import fs from "fs"
import { PinoLogger } from 'nestjs-pino/dist'
import { FormDocument } from '../../schema/form.schema'
import handlebars from 'handlebars'
import { SubmissionDocument } from '../../schema/submission.schema'

@Injectable()
export class SubmissionHookService {
  constructor(
    private httpService: HttpService,
    private readonly logger: PinoLogger,
  ) {
  }

  public async process(submission: SubmissionDocument): Promise<void> {
    await Promise.all(submission.form.hooks.map(async (hook) => {
      if (!hook.enabled) {
        return
      }

      try {
        await this.httpService.post(
          hook.url,
          await this.format(submission, hook.format)
        )
      } catch (e) {
        this.logger.error(`failed to post to "${hook.url}: ${e.message}`)
        throw e
      }
    }))
  }

  private async format(submission: SubmissionDocument, format?: string): Promise<any> {
    if (!submission.populated('form')) {
      submission.populate('form')
      await submission.execPopulate()
    }

    const fields = {}
    submission.form.fields.forEach((field) => {
      fields[field.id] = field
    })

    const data = {
      form: submission.form.id,
      submission: submission.id,
      created: submission.created,
      lastModified: submission.lastModified,
      fields: submission.fields.map((submissionField) => {
        const formField = submission.form.fields.find(formField => formField.id.toString() === submissionField.field)

        return {
          field: formField.id,
          slug: formField.slug || null,
          value: submissionField.fieldValue
        }
      })
    }

    if (!format) {
      return data
    }

    return JSON.parse(handlebars.compile(format)(data))
  }
}
