import { createAtom, IAtom } from 'mobx'
import _ from 'lodash'
import warning from 'warning'
import { createForm } from 'rc-form'
import { WrappedFormUtils } from 'antd/lib/form/Form'

export default class AtomForm {
  originForm: WrappedFormUtils

  public fields: {
    [field_name: string]: {
      value?: any,
      error?: [],
      atom: IAtom,
    }
  } = {}

  private checkObserver = createAtom('is_in_MobX')

  constructor(origin_form: WrappedFormUtils) {
    this.originForm = origin_form
  }

  public getFieldDecorator(field_name: string, options) {
    return control => {
      const element = this.originForm.getFieldDecorator(field_name, options)(control)
      const value = this.originForm.getFieldValue(field_name)
      const errors = this.originForm.getFieldError(field_name)
      warning(this.fieldObserved(field_name), 'getFieldDecorator 需要跟 MobX 配合使用')
      Object.assign(this.fields[field_name], { value, errors })
      return element
    }
  }

  public getFieldProps() {
    warning(false, 'getFieldProps 已废弃，请使用 getFieldDecorator')
    return {}
  }

  public getFieldValue(field_name: string) {
    const value = this.originForm.getFieldValue(field_name)
    this.afterGetOriginField(field_name, 'value', value)
    return value
  }

  public getFieldsValue(field_names?: string[]) {
    const values = this.originForm.getFieldsValue(field_names)
    this.afterGetOriginField(field_names, 'value', values)
    return values
  }

  public getFieldError(field_name: string) {
    const error = this.originForm.getFieldError(field_name)
    this.afterGetOriginField(field_name, 'error', error)
    return error
  }

  public getFieldsError(field_names?: string[]) {
    const errors = this.originForm.getFieldsError(field_names)
    this.afterGetOriginField(field_names, 'error', errors)
    return errors
  }

  private afterGetOriginField(id_or_ids: string | string[] = this.validFieldsName, attr_name: 'value' | 'error', source_value) {
    if (this.checkObserver.reportObserved()) {
      this.fieldsObserved([].concat(id_or_ids), full_name => {
        const attr_value = _.isArray(id_or_ids) ? _.get(source_value, full_name) : _.get(_.set({}, id_or_ids, source_value), full_name)
        Object.assign(this.fields[full_name], { [attr_name]: attr_value })
      })
    }
  }

  private fieldsObserved(field_names: string[], setFiledAttr) {
    field_names.forEach(field_name => {
      const full_names = this.getValidFieldsFullNames(field_name)
      full_names.length === 0 && full_names.push(field_name)
      full_names.forEach(full_name => {
        this.fieldObserved(full_name)
        setFiledAttr(full_name)
      })
    })
  }

  private fieldObserved(field_name) {
    if (!(field_name in this.fields)) {
      this.fields[field_name] = {
        atom: createAtom(
          field_name + '_changed',
          void 0,
          () => {
            delete this.fields[field_name]
          }
        )
      }
    }
    return this.fields[field_name].atom.reportObserved()
  }

  private get validFieldsName() {
    return Object.keys(this.fields)
  }

  private getValidFieldsFullNames(name) {
    return this.validFieldsName.filter(field_name => {
      const name_path = [].concat(_.toPath(name))
      const field_name_path = [].concat(_.toPath(field_name))
      return _.isEqual(name_path, field_name_path.slice(0, name_path.length))
    })
  }
}
