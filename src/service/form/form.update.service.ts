import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormUpdateInput } from '../../dto/form/form.update.input';
import { FormFieldDocument, FormFieldSchemaName } from '../../schema/form.field.schema';
import { FormDocument, FormSchemaName } from '../../schema/form.schema';

@Injectable()
export class FormUpdateService {
  constructor(
    @InjectModel(FormSchemaName) private formModel: Model<FormDocument>,
    @InjectModel(FormFieldSchemaName) private formFieldModel: Model<FormFieldDocument>,
  ) {
  }

  async update(form: FormDocument, input: FormUpdateInput): Promise<FormDocument> {
    if (input.language !== undefined) {
      form.set('language', input.language)
    }

    if (input.title !== undefined) {
      form.set('title', input.title)
    }

    if (input.showFooter !== undefined) {
      form.set('showFooter', input.showFooter)
    }

    const fieldMapping = {}

    if (input.fields !== undefined) {
      const nextFields = await Promise.all(input.fields.map(async (nextField) => {
        let field = form.fields.find(field => field.id.toString() === nextField.id)

        if (!field) {
          field = await this.formFieldModel.create({
            type: nextField.type,
          })
        }

        // ability for other fields to apply mapping
        fieldMapping[nextField.id] = field.id.toString()
        field.set('title', nextField.title)
        field.set('description', nextField.description)
        field.set('required', nextField.required)
        field.set('value', nextField.value)

        return field
      }))

      console.log('field mapping', fieldMapping)

      form.set('fields', nextFields)
    }

    const extractField = (id) => {
      if (id && fieldMapping[id]) {
        return fieldMapping[id]
      }

      return null
    }

    if (input.design !== undefined) {
      form.set('design', input.design)
    }

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

    if (input.startPage !== undefined) {
      form.set('startPage', input.startPage)
    }

    if (input.endPage !== undefined) {
      form.set('endPage', input.endPage)
    }

    await form.save()

    return form
  }
}
