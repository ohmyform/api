import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { DeviceEmbedded } from './embedded/device.embedded'
import { GeoLocationEmbedded } from './embedded/geo.location.embedded'
import { FormEntity } from './form.entity'
import { SubmissionFieldEntity } from './submission.field.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'submission' })
export class SubmissionEntity {
  @PrimaryGeneratedColumn()
  public id: number

  readonly fields: SubmissionFieldEntity[]
  readonly form: FormEntity
  readonly ipAddr: string
  readonly tokenHash: string
  readonly geoLocation: GeoLocationEmbedded
  readonly device: DeviceEmbedded
  readonly timeElapsed: number
  readonly percentageComplete: number

  readonly user?: UserEntity
  readonly created: Date
  readonly lastModified: Date
}
