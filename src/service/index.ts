import { authServices } from './auth';
import { formServices } from './form';
import { MailService } from './mail.service';
import { userServices } from './user';

export const services = [
  ...userServices,
  ...formServices,
  ...authServices,
  MailService,
]
