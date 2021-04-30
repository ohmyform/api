import { HttpService, Injectable } from '@nestjs/common'
import handlebars from 'handlebars'
import { PinoLogger } from 'nestjs-pino/dist'
import { SubmissionEntity } from '../../entity/submission.entity'

@Injectable()
export class SubmissionHookService {
  constructor(
    private httpService: HttpService,
    private readonly logger: PinoLogger,
  ) {
  }

  public async process(submission: SubmissionEntity): Promise<void> {
    await Promise.all(submission.form.hooks.map(async (hook) => {
      if (!hook.enabled) {
        return
      }

      try {
        const response = await this.httpService.post(
          hook.url,
          await this.format(submission, hook.format)
        ).toPromise()

        console.log('sent', response.data)
      } catch (e) {
        this.logger.error(`failed to post to "${hook.url}: ${e.message}`)
        this.logger.error(e.stack)
        throw e
      }
    }))
  }

  private async format(submission: SubmissionEntity, format?: string): Promise<any> {
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
        return {
          field: submissionField.field.id,
          slug: submissionField.field.slug || null,
          value: submissionField.field.value
        }
      })
    }

    if (!format) {
      return data
    }

    return JSON.parse(handlebars.compile(format)(data))
  }
}
