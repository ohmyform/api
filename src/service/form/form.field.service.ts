import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { UserEntity } from '../../entity/user.entity'

@Injectable()
export class FormFieldService {
  constructor(
    @InjectRepository(FormFieldEntity)
    private readonly formFieldRepository: Repository<FormFieldEntity>,
  ) {
  }

  async findById(id: number | string, existing?: FormFieldEntity): Promise<FormFieldEntity> {
    if (existing) return existing

    const entity = await this.formFieldRepository.findOne(id);

    if (!entity) {
      throw new Error('no form field found')
    }

    return entity
  }
}
