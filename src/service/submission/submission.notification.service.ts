import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import handlebars from 'handlebars'
import htmlToText from 'html-to-text'
import mjml2html from 'mjml'
import { PinoLogger } from 'nestjs-pino'
import { SubmissionEntity } from '../../entity/submission.entity'

@Injectable()
export class SubmissionNotificationService {
  constructor(
    private readonly nestMailer: MailerService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  public async process(submission: SubmissionEntity): Promise<void> {
    await Promise.all(submission.form.notifications.map(async (notification) => {
      if (!notification.enabled) {
        return
      }

      try {
        const to = this.getEmail(submission.fields.find(field => field.fieldId === notification.toField.id )?.fieldValue, notification.toEmail)
        const from = this.getEmail(submission.fields.find(field => field.fieldId === notification.fromField.id )?.fieldValue, notification.fromEmail)

        const html = mjml2html(
          handlebars.compile(
            notification.htmlTemplate
          )({
            // TODO add variables
          }),
          {
            minify: true,
          }
        ).html

        await this.nestMailer.sendMail({
          to,
          replyTo: from,
          subject: notification.subject,
          html,
          text: htmlToText.fromString(html),
        })
        console.log('sent notification to', to)
      } catch (e) {
        this.logger.error(e.stack)
        throw e
      }
    }))
  }

  private getEmail(raw: string, fallback: string): string {
    if (!raw) {
      return fallback
    }

    try {
      const data = JSON.parse(raw)

      if (data.value) {
        return data.value
      }
    } catch (e) {
      this.logger.error('could not decode field value', raw)
    }

    return fallback
  }
}
