import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { rolesType } from '../config/roles'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number

  public firstName?: string
  public lastName?: string

  @Column({ length: 255, unique: true })
  public email: string

  @Column({ length: 255, unique: true })
  public username: string

  public passwordHash: string
  public salt: string
  public provider: string
  public roles: rolesType
  public language: string
  public resetPasswordToken?: string
  public resetPasswordExpires?: Date
  public token?: string
  public apiKey?: string
  public created: Date
  public lastModified: Date
}
