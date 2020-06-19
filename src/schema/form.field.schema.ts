import { Document, Schema } from 'mongoose';
import { fieldTypes, matchType } from '../config/fields'
import { FieldOption } from './embedded/field.option';
import { LogicJump } from './embedded/logic.jump';
import { RatingField } from './embedded/rating.field';

export const FormFieldSchemaName = 'FormField'

export interface FormFieldDocument extends Document {
  title: string
  description: string
  slug?: string
  logicJump: any
  rating: any
  options: any
  required: boolean
  disabled: boolean
  type: string
  value: any
}

export const FormFieldSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: false,
    match: matchType.slug,
    trim: true,
  },
  logicJump: {
    type: LogicJump,
  },
  ratingOptions: {
    alias: 'rating',
    type: RatingField,
  },
  fieldOptions: {
    alias: 'options',
    type: [FieldOption],
  },
  required: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fieldType: {
    alias: 'type',
    type: String,
    enum: fieldTypes,
  },
  fieldValue: {
    alias: 'value',
    type: Schema.Types.Mixed,
    default: '',
  },
})

export const FormFieldDefinition = {
  name: FormFieldSchemaName,
  schema: FormFieldSchema,
}

