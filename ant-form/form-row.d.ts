/// <reference types="react" />
import { FormItemProps } from 'antd/lib/form/FormItem';
import { default as BaseFormRow, FormRowProps } from '../base-form/form-row';
export default class FormRow extends BaseFormRow {
    props: FormRowProps & FormItemProps;
    render(): JSX.Element;
}
