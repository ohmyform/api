import { FormFieldDocument } from '../schema/form.field.schema';
import { FormDocument } from '../schema/form.schema';
import { SubmissionFieldDocument } from '../schema/submission.field.schema';
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

  private submissionFields: {
    [id: string]: SubmissionFieldDocument,
  } = {}

  private formFields: {
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

  public addFormField(field: FormFieldDocument) {
    this.formFields[field.id] = field
  }

  public async getFormField(id: any): Promise<FormFieldDocument> {
    return this.formFields[id]
  }

  public addSubmissionField(field: SubmissionFieldDocument) {
    this.submissionFields[field.id] = field
  }

  public async getSubmissionField(id: any): Promise<SubmissionFieldDocument> {
    return this.submissionFields[id]
  }
}
