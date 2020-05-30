import { FormFieldDocument } from '../schema/form.field.schema';
import { FormDocument } from '../schema/form.schema';
import { SubmissionDocument } from '../schema/submission.schema';
import { UserDocument } from '../schema/user.schema';

export class ContextCache {
  private users: {
    [id: string]: UserDocument,
  } = {}

  private forms: {
    [id: string]: FormDocument,
  } = {}

  private submissions: {
    [id: string]: SubmissionDocument,
  } = {}

  private formField: {
    [id: string]: FormFieldDocument,
  } = {}

  public addUser(user: UserDocument) {
    this.users[user.id] = user;
  }

  public async getUser(id: any): Promise<UserDocument> {
    return this.users[id]
  }

  public addForm(form: FormDocument) {
    this.forms[form.id] = form
  }

  public async getForm(id: any): Promise<FormDocument> {
    return this.forms[id]
  }

  public addSubmission(submission: SubmissionDocument) {
    this.submissions[submission.id] = submission
  }

  public async getSubmission(id: any): Promise<SubmissionDocument> {
    return this.submissions[id]
  }

  public addFormField(formField: FormFieldDocument) {
    this.formField[formField.id] = formField
  }

  public async getFormField(id: any): Promise<FormFieldDocument> {
    return this.formField[id]
  }
}
