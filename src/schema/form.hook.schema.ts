import { Document, Schema } from 'mongoose';
import { fieldTypes, matchType } from '../config/fields'
import { FieldOption } from './embedded/field.option';
import { LogicJump } from './embedded/logic.jump';
import { RatingField } from './embedded/rating.field';

export const FormHookSchemaName = 'FormHook'

export interface FormHookDocument extends Document {
  readonly enabled: boolean
  readonly url?: string
  readonly format?: string
}

export const FormHookSchema = new Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  url: {
    type: String,
    match: matchType.url,
    trim: true,
    default: '',
  },
  format: {
    type: String,
  },
})

export const FormHookDefinition = {
  name: FormHookSchemaName,
  schema: FormHookSchema,
}

