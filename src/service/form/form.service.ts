import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
  ) {
  }

  async isAdmin(form: FormEntity, user: UserEntity): Promise<boolean> {
    if (!user) {
      return false
    }

    if (user.roles.includes('superuser')) {
      return true
    }

    return form.admin.id === user.id
  }

  async find(start: number, limit: number, sort: any = {}, user?: UserEntity): Promise<[FormEntity[], number]> {
    const qb = this.formRepository.createQueryBuilder('f')

    qb.leftJoinAndSelect('f.admin', 'a')

    if (user) {
      qb.where('f.admin = :user', { user: user.id })
    }

    // TODO readd sort

    qb.skip(start)
    qb.take(limit)

    return await qb.getManyAndCount()
  }

  async findById(id: string): Promise<FormEntity> {
    const form = await this.formRepository.findOne(id);

    if (!form) {
      throw new Error('no form found')
    }

    return form
  }
}
