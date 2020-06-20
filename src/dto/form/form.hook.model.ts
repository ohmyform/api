import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FormHookDocument } from '../../schema/form.hook.schema'

@ObjectType('FormHook')
export class FormHookModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly enabled: boolean

  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly format?: string

  constructor(hook: FormHookDocument) {
    this.id = hook.id
    this.enabled = hook.enabled
    this.url = hook.url
    this.format = hook.format
  }
}
