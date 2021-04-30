import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import handlebars from 'handlebars'
import htmlToText from 'html-to-text'
import mjml2html from 'mjml'
import { PinoLogger } from 'nestjs-pino/dist'
import { join } from 'path'
import { defaultLanguage } from '../config/languages'

@Injectable()
export class MailService {
  constructor(
    private readonly nestMailer: MailerService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  async send(to: string, template: string, context: { [key: string]: any }, language: string = defaultLanguage): Promise<boolean> {
    this.logger.info({
      email: to,
    }, `send email ${template}`)
    try {
      const path = this.getTemplatePath(template, language)

      const html = mjml2html(
        handlebars.compile(
          fs.readFileSync(path).toString('utf-8')
        )(context),
        {
          minify: true
        }
      ).html

      const text = htmlToText.fromString(html)

      const subject = /<title>(.*?)<\/title>/gi.test(html) ? /<title>(.*?)<\/title>/gi.exec(html)[1] : template

      await this.nestMailer.sendMail({ to, subject, html, text })
      this.logger.info('sent email')
    } catch (error) {
      this.logger.error({
        error: error.message,
        email: to,
      }, `failed to send email ${template}`)
      return false
    }

    return true
  }

  private getTemplatePath(template: string, language: string): string {
    let templatePath = join(this.configService.get<string>('LOCALES_PATH'), language, 'mail', `${template}.mjml`)

    if (!fs.existsSync(templatePath)) {
      templatePath = join(this.configService.get<string>('LOCALES_PATH'), 'en', 'mail', `${template}.mjml`)
    }

    if (!fs.existsSync(templatePath)) {
      throw new Error('invalid template')
    }

    return templatePath
  }
}
