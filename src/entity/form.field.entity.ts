import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RatingEmbedded } from './embedded/rating.embedded'
import { FormEntity } from './form.entity'
import { FormFieldLogicEntity } from './form.field.logic.entity'
import { FormFieldOptionEntity } from './form.field.option.entity'

@Entity({ name: 'form_field' })
export class FormFieldEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormEntity, form => form.fields)
  public form: FormEntity

  @Column()
  public title: string

  @Column({ type: 'text' })
  public description: string

  @Column({ nullable: true })
  public slug?: string

  @OneToMany(() => FormFieldLogicEntity, logic => logic.field, { eager: true })
  public logic: FormFieldLogicEntity[]

  @Column(() => RatingEmbedded)
  public rating: RatingEmbedded = new RatingEmbedded()

  @OneToMany(() => FormFieldOptionEntity, option => option.field, { eager: true })
  public options?: FormFieldOptionEntity[]

  @Column()
  public required: boolean

  @Column({ type: 'boolean' })
  public disabled = false

  @Column()
  public type: string

  @Column()
  public value: string
}
