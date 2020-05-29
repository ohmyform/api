import { Schema, SchemaDefinition } from 'mongoose';
import { FormFieldSchemaName } from '../form.field.schema';

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
    ref: FormFieldSchemaName
  },
  valueB: {
    type: String,
  },
  jumpTo: {
    type: Schema.Types.ObjectId,
    ref: FormFieldSchemaName
  },
  enabled: {
    type: Boolean,
    default: false,
  },
}
