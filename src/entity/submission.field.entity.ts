import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { FormFieldDocument } from '../schema/form.field.schema'
import { FormFieldEntity } from './form.field.entity'

@Entity({ name: 'submission_field' })
export class SubmissionFieldEntity {
  @PrimaryGeneratedColumn()
  public id: number

  readonly field: FormFieldEntity
  readonly fieldType: string
  readonly fieldValue: any
}
