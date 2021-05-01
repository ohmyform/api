import { FormCreateMutation } from './form.create.mutation'
import { FormDeleteMutation } from './form.delete.mutation'
import { FormQuery } from './form.query'
import { FormResolver } from './form.resolver'
import { FormSearchResolver } from './form.search.resolver'
import { FormStatisticResolver } from './form.statistic.resolver'
import { FormUpdateMutation } from './form.update.mutation'

export const formResolvers = [
  FormCreateMutation,
  FormDeleteMutation,
  FormQuery,
  FormResolver,
  FormSearchResolver,
  FormStatisticResolver,
  FormUpdateMutation,
]
