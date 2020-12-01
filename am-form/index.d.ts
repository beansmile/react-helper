import { FormProvider, formConsumer } from '../base-form/form-context';
import { default as BaseFormRow, FormRowProps } from '../base-form/form-row';
export declare function createMobXForm(options?: any): (Target: any) => any;
export declare class FormRow extends BaseFormRow {
    props: FormRowProps;
}
export { FormProvider, formConsumer };
