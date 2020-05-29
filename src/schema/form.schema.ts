import { Document, Schema } from 'mongoose';
import { matchType } from '../config/fields';
import { defaultLanguage, languages } from '../config/languages';
import { ButtonDocument, ButtonSchema } from './button.schema';
import { FormFieldDocument, FormFieldSchema } from './form.field.schema';
import { UserDocument, UserSchemaName } from './user.schema';
import { VisitorDataDocument, VisitorDataSchema } from './visitor.data.schema';

export const FormSchemaName = 'Form'

export interface FormPage {
  readonly show: boolean
  readonly title?: string
  readonly paragraph?: string
  readonly buttonText?: string
  readonly buttons: [ButtonDocument]
}

export interface Notifications {
  readonly subject?: string
  readonly htmlTemplate?: string
  readonly enabled: boolean
}

export interface SelfNotifications extends Notifications{
  readonly fromField?: string
  readonly toEmail?: string
}

export interface RespondentNotifications extends Notifications{
  readonly toField?: string
  readonly fromEmail?: string
}

export interface Colors {
  readonly backgroundColor: string
  readonly questionColor: string
  readonly answerColor: string
  readonly buttonColor: string
  readonly buttonTextColor: string
}

export interface Design {
  readonly colors: Colors

  readonly font?: string
}

export interface FormDocument extends Document {
  readonly title: string
  readonly language: string

  readonly analytics: {
    readonly gaCode?: string
    // TODO extract to separate documents!
    readonly visitors: [VisitorDataDocument]
  }

  readonly fields: [FormFieldDocument]

  readonly admin: UserDocument

  readonly startPage: FormPage;
  readonly endPage: FormPage;

  readonly selfNotifications: SelfNotifications;
  readonly respondentNotifications: RespondentNotifications;

  readonly showFooter: boolean;
  readonly isLive: boolean;
  readonly design: Design;


  readonly created: Date
  readonly lastModified: Date
}

export const FormSchema = new Schema({
  title: {
    trim: true,
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
  lastModified: {
    type: Date,
  },
  language: {
    type: String,
    enum: languages,
    default: defaultLanguage,
    required: true,
  },
  analytics: {
    gaCode: {
      type: String,
    },
    visitors: {
      type: [VisitorDataSchema],
    },
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  form_fields: {
    alias: 'fields',
    type: [FormFieldSchema],
    default: [],
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: UserSchemaName,
  },
  startPage: {
    showStart: {
      alias: 'startPage.show',
      type: Boolean,
      default: false
    },
    introTitle: {
      alias: 'startPage.title',
      type: String,
      default: 'Welcome to Form',
    },
    introParagraph: {
      alias: 'startPage.paragraph',
      type: String,
      default: 'Start',
    },
    buttons: {
      type: [ButtonSchema],
    },
  },
  endPage: {
    showEnd: {
      alias: 'endPage.show',
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Thank you for filling out the form',
    },
    paragraph: {
      type: String,
    },
    buttonText: {
      type: String,
      default: 'Go back to Form'
    },
    buttons: {
      type: [ButtonSchema],
    },
  },
  selfNotifications: {
    fromField: {
      type: String,
    },
    toEmails: {
      alias: 'selfNotifications.toEmail',
      type: String,
    },
    subject: {
      type: String,
    },
    htmlTemplate: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: false
    },
  },
  respondentNotifications: {
    toField: {
      type: String,
    },
    fromEmails: {
      alias: 'respondentNotifications.fromEmail',
      type: String,
      match: matchType.email,
    },
    subject: {
      type: String,
      default: 'OhMyForm: Thank you for filling out this OhMyForm',
    },
    htmlTemplate: {
      type: String,
      default: 'Hello, <br><br> We’ve received your submission. <br><br> Thank you & have a nice day!',
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  isLive: {
    type: Boolean,
    default: true,
  },
  design: {
    colors: {
      backgroundColor: {
        type: String,
        match: matchType.color,
        default: '#fff'
      },
      questionColor: {
        type: String,
        match: matchType.color,
        default: '#333'
      },
      answerColor: {
        type: String,
        match: matchType.color,
        default: '#333'
      },
      buttonColor: {
        type: String,
        match: matchType.color,
        default: '#fff'
      },
      buttonTextColor: {
        type: String,
        match: matchType.color,
        default: '#333'
      },
    },

    font: {
      type: String,
    },
  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'lastModified',
  }
})

export const FormDefinition = {
  name: FormSchemaName,
  schema: FormSchema,
}

