import * as React from 'react'
import { Form } from 'antd'
import { FormProps } from 'antd/lib/form/Form'
import _ from 'lodash'
import { FormProvider } from '../base-form/form-context'
import { createFactory } from '../mobx-form'

export default class FormGroup extends React.Component {
  static defaultProps = _.omit(Form.defaultProps, 'onSubmit')

  static create(options?) {
    return createFactory(Form.create, options)
  }

  props: FormProps & {
    data?: Object,
  }

  render() {
    const { className = '', form, data, ...props } = this.props

    const formElement = <Form className={`form-group ${className}`} {...props}/>

    if (form) {
      return (
        <FormProvider value={{ form, data }}>
          {formElement}
        </FormProvider>
      )
    } else {
      return formElement
    }
  }
}
