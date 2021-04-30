import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PageButtonEntity } from './page.button.entity'

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

  @OneToMany(() => PageButtonEntity, button => button.page)
  readonly buttons: PageButtonEntity[]
}
