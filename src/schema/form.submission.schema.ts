import { Document, Schema } from 'mongoose';
import { FieldSchema } from './field.schema';
import { FormSchemaName } from './form.schema';

export const FormSubmissionSchemaName = 'FormSubmission'

export interface FormSubmissionDocument extends Document {
}

export const FormSubmissionSchema = new Schema({
  fields: {
    alias: 'form_fields',
    type: [FieldSchema],
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

export const FormSubmissionDefinition = {
  name: FormSubmissionSchemaName,
  schema: FormSubmissionSchema,
}

