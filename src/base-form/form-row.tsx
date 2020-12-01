import * as React from 'react'
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import _ from 'lodash'

export default class FormRow extends React.Component {
  static defaultProps = {
    required: true,
    transInitial: value => value,
  }

  props: FormRowProps

  get message() {
    const { message, label } = this.props
    return message || (label ? `无效的${label}` : '')
  }

  get initialValue() {
    const { id, options = {}, data, transInitial } = this.props
    return transInitial(_.get(data, id, options.initialValue))
  }

  renderChildren() {
    if (!this.props.id) return this.props.children
    const {
      form,
      id, children, render, required, rule,
      options: {
        valuePropName = 'value',
        rules = [],
        ...options
      } = {},
    } = this.props

    const fieldOptions = {
      valuePropName,
      rules: rules.concat({ required, message: this.message, whitespace: true, ...rule }),
      ...options,
      initialValue: this.initialValue,
    }
    const wrapper = control => form.getFieldDecorator(id, fieldOptions)(control)

    return typeof render === 'function' ? render(wrapper) : wrapper(children)
  }

  render() {
    return this.renderChildren()
  }
}

export interface FormRowProps {
  id?: string
  label?: string,
  required?: boolean,
  transInitial?: (any) => any
  message?: string
  rule?: Object
  options?: GetFieldDecoratorOptions
  children?: any
  render?: Function
  form?: WrappedFormUtils
  data?: Object
}
