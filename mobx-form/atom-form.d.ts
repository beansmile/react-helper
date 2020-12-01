/// <reference path="../observer-table/index.d.ts" />
/// <reference types="react" />
import { IAtom } from 'mobx';
import { WrappedFormUtils } from 'antd/lib/form/Form';
export default class AtomForm {
    originForm: WrappedFormUtils;
    fields: {
        [field_name: string]: {
            value?: any;
            error?: [];
            atom: IAtom;
        };
    };
    private checkObserver;
    constructor(origin_form: WrappedFormUtils);
    getFieldDecorator(field_name: string, options: any): (control: any) => import("react").ReactNode;
    getFieldProps(): {};
    getFieldValue(field_name: string): any;
    getFieldsValue(field_names?: string[]): Object;
    getFieldError(field_name: string): Object[];
    getFieldsError(field_names?: string[]): Object;
    private afterGetOriginField;
    private fieldsObserved;
    private fieldObserved;
    private readonly validFieldsName;
    private getValidFieldsFullNames;
}
