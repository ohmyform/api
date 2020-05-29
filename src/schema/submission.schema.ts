import { Document, Schema } from 'mongoose';
import { FormSchemaName } from './form.schema';
import { SubmissionFieldDocument, SubmissionFieldSchemaName } from './submission.field.schema';

export const SubmissionSchemaName = 'FormSubmission'

export interface SubmissionDocument extends Document {
  fields: SubmissionFieldDocument[]
}

export const SubmissionSchema = new Schema({
  fields: {
    alias: 'form_fields',
    type: [SubmissionFieldSchemaName],
    default: [],
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: FormSchemaName,
    required: true
  },
  ipAddr: {
    type: String
  },
  geoLocation: {
    Country: {
      type: String
    },
    City: {
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
    type: Number
  },
  percentageComplete: {
    type: Number
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

