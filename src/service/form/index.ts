import { FormCreateService } from './form.create.service';
import { FormDeleteService } from './form.delete.service';
import { FormService } from './form.service';
import { FormUpdateService } from './form.update.service';

export const formServices = [
  FormService,
  FormCreateService,
  FormUpdateService,
  FormDeleteService,
]
