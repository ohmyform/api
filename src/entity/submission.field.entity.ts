import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormFieldEntity } from './form.field.entity'
import { SubmissionEntity } from './submission.entity'

@Entity({ name: 'submission_field' })
export class SubmissionFieldEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => SubmissionEntity, submission => submission.fields)
  public submission: SubmissionEntity

  @ManyToOne(() => FormFieldEntity, { eager: true })
  public field: FormFieldEntity

  @Column()
  public fieldType: string

  @Column()
  public fieldValue: string
}
