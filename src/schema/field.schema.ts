import { Document, Schema } from 'mongoose';
import { fieldTypes } from '../config/fields';
import { FieldOption } from './embedded/field.option';
import { LogicJump } from './embedded/logic.jump';
import { RatingField } from './embedded/rating.field';

export const FieldSchemaName = 'FormField'

export interface FieldDocument extends Document {
  isSubmission: boolean
}

export const FieldSchema = new Schema({
  isSubmission: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  logicJump: {
    type: LogicJump,
  },
  ratingOptions: {
    type: RatingField,
  },
  fieldOptions: {
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
  deletePreserved: { // TODO remove
    type: Boolean,
    default: false,
  },
  validFieldTypes: { // TODO remove
    type: [String],
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
