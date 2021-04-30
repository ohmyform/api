import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { AnalyticsEmbedded } from './embedded/analytics.embedded'
import { DesignEmbedded } from './embedded/design.embedded'
import { FormFieldEntity } from './form.field.entity'
import { FormHookEntity } from './form.hook.entity'
import { FormNotificationEntity } from './form.notification.entity'
import { SubmissionEntity } from './submission.entity'
import { VisitorEntity } from './visitor.entity'
import { PageEntity } from './page.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'form' })
export class FormEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column({ length: 10 })
  public language: string

  @Column(() => AnalyticsEmbedded)
  public analytics: AnalyticsEmbedded

  @OneToMany(() => VisitorEntity, visitor => visitor.form)
  public visitors: VisitorEntity[]

  @OneToMany(() => SubmissionEntity, submission => submission.form)
  public submissions: SubmissionEntity[]

  @OneToMany(() => FormFieldEntity, field => field.form)
  public fields: FormFieldEntity[]

  @OneToMany(() => FormHookEntity, field => field.form)
  public hooks: FormHookEntity[]

  @ManyToOne(() => UserEntity)
  public admin: UserEntity

  @ManyToOne(() => PageEntity)
  public startPage: PageEntity;

  @ManyToOne(() => PageEntity)
  public endPage: PageEntity;

  @OneToMany(() => FormNotificationEntity, notification => notification.form)
  public notifications: FormNotificationEntity[]

  @Column()
  public showFooter: boolean;

  @Column()
  public isLive: boolean;

  @Column(() => DesignEmbedded)
  public design: DesignEmbedded;

  @CreateDateColumn()
  public created: Date

  @UpdateDateColumn()
  public lastModified: Date

}
