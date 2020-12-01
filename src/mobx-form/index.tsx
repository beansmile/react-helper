import * as React from 'react'
import _ from 'lodash'
import { createForm } from 'rc-form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AtomForm from './atom-form'

export * from 'rc-form'

export function createFactory(rcFormCreate, options) {
  const wrapper = rcFormCreate(options)
  const formPropName = _.get(options, 'formPropName', 'form')

  return function (Target) {
    class MobXForm extends React.Component {
      atomForm = new AtomForm(this.formProp)

      form = {
        ...this.formProp,
        validateFields: (...args) => validateMethodChange(args, this.formProp.validateFields),
        validateFieldsAndScroll: (...args) => validateMethodChange(args, this.formProp.validateFieldsAndScroll),
        getFieldValue: this.atomForm.getFieldValue.bind(this.atomForm),
        getFieldsValue: this.atomForm.getFieldsValue.bind(this.atomForm),
        getFieldError: this.atomForm.getFieldError.bind(this.atomForm),
        getFieldsError: this.atomForm.getFieldsError.bind(this.atomForm),
        getFieldDecorator: this.atomForm.getFieldDecorator.bind(this.atomForm),
        getFieldProps: this.atomForm.getFieldProps,
        origin: this.formProp,
      }

      get formProp(): WrappedFormUtils {
        return this.props[formPropName]
      }

      shouldComponentUpdate(nextProps) {
        return !_.isEqual(_.omit(this.props, formPropName), _.omit(nextProps, formPropName))
      }

      componentWillReceiveProps() {
        const values = this.formProp.getFieldsValue()
        const error_list = this.formProp.getFieldsError()
        _.forEach(this.atomForm.fields, (field, key) => {
          if (field.value !== _.get(values, key) || field.error !== _.get(error_list, key)) {
            field.atom.reportChanged()
          }
        })
      }

      render() {
        return React.createElement(Target, {
          ...this.props,
          [formPropName]: this.form,
        })
      }
    }

    return wrapper(MobXForm)
  }
}

function validateMethodChange(args, func) {
  return new Promise((resolve, reject) => {
    func(...args, (error, values) => {
      try {
        if (error) {
          const err = new Error
          err['result'] = error
          err['sentry_ignore'] = true
          err.message = _.map(error, value => _.map(value.errors, value => value.message).join('\n')).join('\n')
          reject(err)
        } else {
          resolve(values)
        }
      } catch (e) {
        reject(e)
      }
    })
  })
}
