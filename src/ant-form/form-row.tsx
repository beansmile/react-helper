import * as React from 'react'
import { Form } from 'antd'
import { observer } from 'mobx-react'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { formConsumer } from '../base-form/form-context'
import { default as BaseFormRow, FormRowProps } from '../base-form/form-row'
import _ from 'lodash'

@formConsumer
@observer
export default class FormRow extends BaseFormRow {
  props: FormRowProps & FormItemProps

  render() {
    const props = _.omit(this.props, 'id', 'message', 'children')
    return (
      <Form.Item {...props}>
        {this.renderChildren()}
      </Form.Item>
    )
  }
}
