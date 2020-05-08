import { Schema, Document } from 'mongoose';
import { matchType } from '../config/fields';

export interface ButtonDocument extends Document{
  readonly url?: string
  readonly action?: string
  readonly text?: string
  readonly bgColor?: string
  readonly color?: string
}

export const ButtonSchema = new Schema({
  url: {
    type: String,
    match: matchType.url,
  },
  action: {
    type: String,
  },
  text: {
    type: String,
  },
  bgColor: {
    type: String,
    match: matchType.color,
    default: '#5bc0de',
  },
  color: {
    type: String,
    match: matchType.color,
    default: '#ffffff'
  },
})
