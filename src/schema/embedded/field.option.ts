import { Document, SchemaDefinition } from 'mongoose';

export interface FieldOptionDocument extends Document {
  readonly key?: string
  readonly title?: string
  readonly value: string
}

export const FieldOption: SchemaDefinition = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  option_id: {
    alias: 'key',
    type: String,
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  option_title: {
    alias: 'title',
    type: String,
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  option_value: {
    alias: 'value',
    type: String,
    trim: true,
  },
}
