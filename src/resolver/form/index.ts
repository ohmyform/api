import { FieldResolver } from './field.resolver';
import { FormCreateResolver } from './form.create.resolver';
import { FormResolver } from './form.resolver';

export const formResolvers = [
  FormResolver,
  FormCreateResolver,
  FieldResolver,
]
