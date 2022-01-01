import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'
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

  @RelationId('field')
  readonly fieldId: number

  @Column()
  public fieldType: string

  @Column()
  public fieldValue: string
}
