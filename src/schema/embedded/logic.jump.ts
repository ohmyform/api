import { Document, Schema, SchemaDefinition } from 'mongoose';
import { FormFieldSchemaName } from '../form.field.schema';

export interface LogicJumpDocument extends Document {
  readonly expressionString?: string
  readonly fieldA?: string
  readonly valueB?: string
  readonly jumpTo?: string
  readonly enabled?: boolean
}

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
