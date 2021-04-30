import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'button' })
export class ButtonEntity {
  @PrimaryGeneratedColumn()
  public id: number

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
