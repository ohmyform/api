import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormEntity } from './form.entity'
import { FormFieldEntity } from './form.field.entity'

@Entity({ name: 'form_notification' })
export class FormNotificationEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormEntity, form => form.notifications)
  public form: FormEntity

  @Column({ nullable: true })
  readonly subject?: string

  @Column({ nullable: true })
  readonly htmlTemplate?: string

  @Column()
  readonly enabled: boolean

  @ManyToOne(() => FormFieldEntity)
  readonly fromField?: FormFieldEntity

  @ManyToOne(() => FormFieldEntity)
  readonly toField?: FormFieldEntity

  @Column({ nullable: true })
  readonly toEmail?: string

  @Column({ nullable: true })
  readonly fromEmail?: string
}
