import { Document, Schema } from 'mongoose';
import { defaultLanguage, languages } from '../config/languages';
import { FormFieldDocument, FormFieldSchemaName } from './form.field.schema';

export interface VisitorDataDocument extends Document {
  readonly introParagraph?: string
  readonly referrer?: string
  readonly filledOutFields: [FormFieldDocument]
  readonly timeElapsed: number
  readonly isSubmitted: boolean
  readonly language: string
  readonly ipAddr: string
  readonly deviceType: string
  readonly userAgent: string
}

export const VisitorDataSchema = new Schema({
  introParagraph: {
    type: String,
  },
  referrer: {
    type: String,
  },
  filledOutFields: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: FormFieldSchemaName,
    }],
  },
  timeElapsed: {
    type: Number,
  },
  isSubmitted: {
    type: Boolean,
  },
  language: {
    type: String,
    enum: languages,
    default: defaultLanguage,
  },
  ipAddr: {
    type: String,
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'phone', 'tablet', 'other'],
    default: 'other',
  },
  userAgent: {
    type: String,
  },
})
