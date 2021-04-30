import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormUpdateInput } from '../../dto/form/form.update.input'
import { FormEntity } from '../../entity/form.entity'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { FormHookEntity } from '../../entity/form.hook.entity'

@Injectable()
export class FormUpdateService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @InjectRepository(FormFieldEntity)
    private readonly formFieldRepository: Repository<FormFieldEntity>,
    @InjectRepository(FormHookEntity)
    private readonly formHookRepository: Repository<FormHookEntity>,
  ) {
  }

  async update(form: FormEntity, input: FormUpdateInput): Promise<FormEntity> {
    if (input.language !== undefined) {
      form.language = input.language
    }

    if (input.title !== undefined) {
      form.title = input.title
    }

    if (input.showFooter !== undefined) {
      form.showFooter = input.showFooter
    }

    if (input.isLive !== undefined) {
      form.isLive = input.isLive
    }

    const fieldMapping = {}

    if (input.fields !== undefined) {
      form.fields = await Promise.all(input.fields.map(async (nextField) => {
        let field = form.fields.find(field => field.id.toString() === nextField.id)

        if (!field) {
          field = new FormFieldEntity()
          field.type = nextField.type
        }

        // ability for other fields to apply mapping
        fieldMapping[nextField.id] = field.id.toString()
        field.title = nextField.title
        field.description = nextField.description
        field.required = nextField.required
        field.value = nextField.value

        if (nextField.slug !== undefined) {
          field.slug = nextField.slug
        }

        if (nextField.logic !== undefined) {
          // TODO prepare logic entries
          // field.logicJump = nextField.logicJump
        }

        if (nextField.options !== undefined) {
          // TODO prepare options
          // field.options = nextField.options
        }

        if (nextField.rating !== undefined) {
          field.rating = nextField.rating
        }

        return field
      }))

    }

    if (input.hooks !== undefined) {
      form.hooks = input.hooks.map((nextHook) => {
        let hook = form.hooks && form.hooks.find(hook => hook.id.toString() === nextHook.id)

        if (!hook) {
          hook = new FormHookEntity()
        }

        // ability for other fields to apply mapping
        hook.url = nextHook.url
        hook.enabled = nextHook.enabled

        if (nextHook.format !== undefined) {
          hook.format = nextHook.format
        }

        return hook
      })

    }

    const extractField = (id) => {
      if (id && fieldMapping[id]) {
        return fieldMapping[id]
      }

      return null
    }

    if (input.design !== undefined) {
      if (input.design.font !== undefined) {
        form.design.font = input.design.font
      }

      if (input.design.colors !== undefined) {
        if (input.design.colors.answer !== undefined) {
          form.design.colors.answer = input.design.colors.answer
        }
        if (input.design.colors.buttonText !== undefined) {
          form.design.colors.buttonText = input.design.colors.buttonText
        }
        if (input.design.colors.background !== undefined) {
          form.design.colors.background = input.design.colors.background
        }
        if (input.design.colors.button !== undefined) {
          form.design.colors.button = input.design.colors.button
        }
        if (input.design.colors.buttonActive !== undefined) {
          form.design.colors.buttonActive = input.design.colors.buttonActive
        }
        if (input.design.colors.question !== undefined) {
          form.design.colors.question = input.design.colors.question
        }
      }
    }

    /*
    if (input.selfNotifications !== undefined) {
      form.set('selfNotifications', {
        ...input.selfNotifications,
        fromField: extractField(input.selfNotifications.fromField)
      })
    }

    if (input.respondentNotifications !== undefined) {
      form.set('respondentNotifications', {
        ...input.respondentNotifications,
        toField: extractField(input.respondentNotifications.toField)
      })
    }
    */

    if (input.startPage !== undefined) {
      // TODO fix start page
      // form.set('startPage', input.startPage)
    }

    if (input.endPage !== undefined) {
      // TODO fix end page
      // form.set('endPage', input.endPage)
    }

    await this.formRepository.save(form)

    return form
  }
}
