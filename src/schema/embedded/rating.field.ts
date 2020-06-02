import { Document, SchemaDefinition } from 'mongoose';

export interface RatingFieldDocument extends Document {
  readonly steps?: number
  readonly shape?: string
}

export const RatingField: SchemaDefinition = {
  steps: {
    type: Number,
    min: 1,
    max: 10,
  },
  shape: {
    type: String,
    enum: [
      'Heart',
      'Star',
      'thumbs-up',
      'thumbs-down',
      'Circle',
      'Square',
      'Check Circle',
      'Smile Outlined',
      'Hourglass',
      'bell',
      'Paper Plane',
      'Comment',
      'Trash',
    ],
  },
}
