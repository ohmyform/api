import { FormCreateMutation } from './form.create.mutation'
import { FormDeleteMutation } from './form.delete.mutation'
import { FormResolver } from './form.resolver'
import { FormSearchResolver } from './form.search.resolver'
import { FormStatisticResolver } from './form.statistic.resolver'
import { FormUpdateMutation } from './form.update.mutation'

export const formResolvers = [
  FormCreateMutation,
  FormDeleteMutation,
  FormResolver,
  FormSearchResolver,
  FormStatisticResolver,
  FormUpdateMutation,
]
