import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormCreateInput } from '../../dto/form/form.create.input'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'

@Injectable()
export class FormCreateService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>
  ) {
  }

  async create(admin: UserEntity, input: FormCreateInput): Promise<FormEntity> {
    const form = new FormEntity()

    form.title = input.title
    form.isLive = input.isLive
    form.showFooter = input.showFooter
    form.language = input.language

    form.admin = admin

    return await this.formRepository.save(form)
  }
}

