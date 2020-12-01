import { observer } from 'mobx-react'
import { createForm } from 'rc-form'
import { FormProvider, formConsumer } from '../base-form/form-context'
import { default as BaseFormRow, FormRowProps } from '../base-form/form-row'
import { createFactory } from '../mobx-form'

export function createMobXForm(options?) {
  return createFactory(createForm, options)
}

@formConsumer
@observer
export class FormRow extends BaseFormRow {
  props: FormRowProps
}

export { FormProvider, formConsumer }
