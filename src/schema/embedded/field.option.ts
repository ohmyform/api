import { Document, SchemaDefinition } from 'mongoose';

export interface FieldOptionDocument extends Document {
  readonly key?: string
  readonly title?: string
  readonly value: string
}

export const FieldOption: SchemaDefinition = {
  option_id: {
    alias: 'key',
    type: String,
  },
  option_title: {
    alias: 'title',
    type: String,
  },
  option_value: {
    alias: 'value',
    type: String,
    trim: true,
  },
}
