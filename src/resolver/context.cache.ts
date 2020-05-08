import { FormDocument } from '../schema/form.schema';
import { UserDocument } from '../schema/user.schema';

export class ContextCache {
  private users: {
    [id: string]: UserDocument,
  } = {}

  private forms: {
    [id: string]: FormDocument,
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
}
