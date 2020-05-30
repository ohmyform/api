import { Document, Schema } from 'mongoose';
import { matchType } from '../config/fields';

export interface ButtonDocument extends Document{
  readonly url?: string
  readonly action?: string
  readonly text?: string
  readonly bgColor?: string
  readonly activeColor?: string
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
    default: '#fff',
  },
  activeColor: {
    type: String,
    match: matchType.color,
    default: '#40a9ff',
  },
  color: {
    type: String,
    match: matchType.color,
    default: '#666'
  },
})
