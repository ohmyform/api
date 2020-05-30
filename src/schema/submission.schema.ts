import { Document, Schema } from 'mongoose';
import { FormDocument, FormSchemaName } from './form.schema';
import { SubmissionFieldDocument, SubmissionFieldSchema } from './submission.field.schema';
import { UserDocument, UserSchemaName } from './user.schema';

export const SubmissionSchemaName = 'Submission'

export interface GeoLocation {
  readonly country?: string
  readonly city?: string
}

export interface Device {
  readonly type?: string
  readonly name?: string
}

export interface SubmissionDocument extends Document {
  readonly fields: SubmissionFieldDocument[]
  readonly form: FormDocument
  readonly ipAddr: string
  readonly tokenHash: string
  readonly geoLocation: GeoLocation
  readonly device: Device
  readonly timeElapsed: number
  readonly percentageComplete: number

  readonly user?: UserDocument
  readonly created: Date
  readonly lastModified: Date
}

export const SubmissionSchema = new Schema({
  fields: {
    type: [SubmissionFieldSchema],
    default: [],
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: FormSchemaName,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: UserSchemaName,
  },
  ipAddr: {
    type: String
  },
  tokenHash: {
    type: String
  },
  geoLocation: {
    country: {
      type: String
    },
    city: {
      type: String
    }
  },
  device: {
    type: {
      type: String
    },
    name: {
      type: String
    }
  },
  timeElapsed: {
    type: Number,
    default: 0,
  },
  percentageComplete: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'lastModified',
  }
})

export const SubmissionDefinition = {
  name: SubmissionSchemaName,
  schema: SubmissionSchema,
}

