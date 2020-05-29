import { FormCreateMutation } from './form.create.mutation';
import { FormDeleteMutation } from './form.delete.mutation';
import { FormResolver } from './form.resolver';
import { FormSearchResolver } from './form.search.resolver';
import { FormUpdateMutation } from './form.update.mutation';

export const formResolvers = [
  FormResolver,
  FormSearchResolver,
  FormCreateMutation,
  FormDeleteMutation,
  FormUpdateMutation,
]
