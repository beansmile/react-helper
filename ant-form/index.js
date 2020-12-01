import 'antd/lib/form/style';
import _Form from 'antd/lib/form';

export { FormProvider, formConsumer } from '../base-form/form-context';
export { default as FormGroup } from './form-group';
export { default as FormRow } from './form-row';
export var FormItem = _Form.Item;