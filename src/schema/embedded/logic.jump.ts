import { Schema, SchemaDefinition } from 'mongoose';
import { FieldSchemaName } from '../field.schema';

export const LogicJump: SchemaDefinition = {
  expressionString: {
    type: String,
    enum: [
      'field == static',
      'field != static',
      'field > static',
      'field >= static',
      'field <= static',
      'field < static',
      'field contains static',
      'field !contains static',
      'field begins static',
      'field !begins static',
      'field ends static',
      'field !ends static',
    ],
  },
  fieldA: {
    type: Schema.Types.ObjectId,
    ref: FieldSchemaName
  },
  valueB: {
    type: String,
  },
  jumpTo: {
    type: Schema.Types.ObjectId,
    ref: FieldSchemaName
  },
  enabled: {
    type: Boolean,
    default: false,
  },
}
