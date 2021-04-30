import { FormFieldEntity } from '../form.field.entity'

export class LogicEmbedded {
  readonly formula?: string
  readonly hide?: boolean
  readonly jumpTo?: FormFieldEntity
  readonly enabled?: boolean
}
