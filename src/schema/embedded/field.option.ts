import { SchemaDefinition } from 'mongoose';

export const FieldOption: SchemaDefinition = {
  id: {
    alias: 'option_id',
    type: Number,
  },
  title: {
    alias: 'option_title',
    type: String,
  },
  value: {
    alias: 'option_value',
    type: String,
    trim: true,
  },
}
