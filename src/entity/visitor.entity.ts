import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormFieldDocument } from '../schema/form.field.schema'
import { FormEntity } from './form.entity'
import { FormFieldEntity } from './form.field.entity'

@Entity({ name: 'form_visitor' })
export class VisitorEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormEntity, form => form.visitors)
  public form: FormEntity

  @ManyToOne(() => FormEntity, form => form.visitors)
  public submission: FormEntity

  @Column({ nullable: true })
  readonly referrer?: string

  readonly timeElapsed: number
  readonly isSubmitted: boolean
  readonly language: string
  readonly ipAddr: string
  readonly deviceType: string
  readonly userAgent: string
}
