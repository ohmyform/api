import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ButtonEntity } from './button.entity'

@Entity({ name: 'page' })
export class PageEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  readonly show: boolean

  @Column({ nullable: true })
  readonly title?: string

  @Column({ type: 'text', nullable: true })
  readonly paragraph?: string

  @Column({ nullable: true })
  readonly buttonText?: string

  readonly buttons: ButtonEntity[]
}
