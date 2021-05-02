import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubmissionStartInput } from '../../dto/submission/submission.start.input'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'
import { UserEntity } from '../../entity/user.entity'
import { SubmissionTokenService } from './submission.token.service'

@Injectable()
export class SubmissionStartService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    private readonly tokenService: SubmissionTokenService
  ) {
  }

  async start(
    form: FormEntity,
    input: SubmissionStartInput,
    user?: UserEntity,
    ipAddr?: string,
  ): Promise<SubmissionEntity> {
    const submission = new SubmissionEntity()

    submission.form = form
    submission.user = user
    submission.ipAddr = ipAddr || '?'
    submission.timeElapsed = 0
    submission.percentageComplete = 0

    submission.device.language = input.device.language
    submission.device.name = input.device.name
    submission.device.type = input.device.type

    submission.tokenHash = await this.tokenService.hash(input.token)

    return await this.submissionRepository.save(submission)
  }
}
