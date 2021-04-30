import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PageEntity } from './page.entity'

@Entity({ name: 'page_button' })
export class PageButtonEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => PageEntity, page => page.buttons)
  public page: PageEntity

  @Column({ nullable: true })
  readonly url?: string

  @Column({ nullable: true })
  readonly action?: string

  @Column()
  readonly text: string

  @Column({ nullable: true })
  readonly bgColor?: string

  @Column({ nullable: true })
  readonly activeColor?: string

  @Column({ nullable: true })
  readonly color?: string
}
