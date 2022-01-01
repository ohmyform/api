import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { PinoLogger } from 'nestjs-pino'
import { Repository } from 'typeorm'
import { SubmissionSetFieldInput } from '../../dto/submission/submission.set.field.input'
import { SubmissionEntity } from '../../entity/submission.entity'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'
import { SubmissionHookService } from './submission.hook.service'
import { SubmissionNotificationService } from './submission.notification.service'

@Injectable()
export class SubmissionSetFieldService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    @InjectRepository(SubmissionFieldEntity)
    private readonly submissionFieldRepository: Repository<SubmissionFieldEntity>,
    private readonly webHook: SubmissionHookService,
    private readonly notifications: SubmissionNotificationService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  async saveField(submission: SubmissionEntity, input: SubmissionSetFieldInput): Promise<void> {
    let field = submission.fields.find(field => field.field.id.toString() === input.field)

    if (field) {
      field.fieldValue = JSON.parse(input.data)

      await this.submissionFieldRepository.save(field)
    } else {
      field = new SubmissionFieldEntity()

      field.submission = submission
      field.field = submission.form.fields.find(field => field.id.toString() === input.field)
      field.fieldType = field.field.type
      field.fieldValue = JSON.parse(input.data)

      field = await this.submissionFieldRepository.save(field)

      submission.fields.push(field)

      submission.percentageComplete = (submission.fields.length) / submission.form.fields.length
    }

    submission.timeElapsed = dayjs().diff(dayjs(submission.created), 'second')

    await this.submissionRepository.save(submission)

    if (submission.percentageComplete === 1) {
      this.webHook.process(submission).catch(e => {
        this.logger.error(`failed to send webhooks: ${e.message}`)
      })
      this.notifications.process(submission).catch(e => {
        this.logger.error(`failed to send notifications: ${e.message}`)
      })
    }
  }
}
