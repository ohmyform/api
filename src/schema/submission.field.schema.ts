import { Document, Schema } from 'mongoose';
import { fieldTypes } from '../config/fields';
import { FormFieldDocument, FormFieldSchemaName } from './form.field.schema';

export const SubmissionFieldSchemaName = 'SubmissionField'

export interface SubmissionFieldDocument extends Document {
  field: FormFieldDocument
  fieldType: string
  fieldValue: any
}

export const SubmissionFormFieldSchema = new Schema({
  field: {
    type: Schema.Types.ObjectId,
    ref: FormFieldSchemaName
  },
  fieldType: {
    type: String,
    enum: fieldTypes,
  },
  fieldValue: {
    type: Schema.Types.Mixed,
    default: '',
  },
})
