import { Document, Schema } from 'mongoose';
import { defaultLanguage, languages } from '../config/languages';
import { roles, rolesType } from '../config/roles';

export const UserSchemaName = 'User'

export interface UserDocument extends Document {
  readonly firstName?: string
  readonly lastName?: string
  readonly email: string
  readonly username: string
  readonly passwordHash: string
  readonly salt: string
  readonly provider: string
  readonly roles: rolesType
  readonly language: string
  readonly resetPasswordToken?: string
  readonly resetPasswordExpires?: Date
  readonly token?: string
  readonly apiKey?: string
  readonly created: Date
  readonly lastModified: Date
}

export const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9\-]+$/,
    required: true,
  },
  passwordHash: {
    type: String,
    default: '',
  },
  salt: {
    type: String,
  },
  provider: {
    type: String,
    default: 'local'
  },
  roles: {
    type: [{
      type: String,
      enum: roles,
    }],
    default: ['user'],
  },
  language: {
    type: String,
    enum: languages,
    default: defaultLanguage,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  token: {
    type: String,
  },
  apiKey: {
    type: String,
    unique: true,
    index: true,
    sparse: true
  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'lastModified',
  }
})

export const UserDefinition = {
  name: UserSchemaName,
  schema: UserSchema,
}
