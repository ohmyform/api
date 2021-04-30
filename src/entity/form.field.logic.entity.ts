import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { FormFieldEntity } from './form.field.entity'

type LogicAction = 'visible' | 'require' | 'disable' | 'jumpTo'

@Entity({ name: 'form_field_logic' })
export class FormFieldLogicEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormFieldEntity, field => field.options)
  public field: FormFieldEntity

  @Column()
  public formula: string

  @Column({ type: 'varchar', length: 10 })
  public action: LogicAction

  @Column({ nullable: true })
  public visible?: boolean

  @Column({ nullable: true })
  public require?: boolean

  @Column({ nullable: true })
  public disable?: boolean

  @ManyToOne(() => FormFieldEntity)
  public jumpTo?: FormFieldEntity

  @Column()
  public enabled: boolean
}
