import * as React from 'react';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
export default class FormRow extends React.Component {
    static defaultProps: {
        required: boolean;
        transInitial: (value: any) => any;
    };
    props: FormRowProps;
    readonly message: string;
    readonly initialValue: any;
    renderChildren(): any;
    render(): any;
}
export interface FormRowProps {
    id?: string;
    label?: string;
    required?: boolean;
    transInitial?: (any: any) => any;
    message?: string;
    rule?: Object;
    options?: GetFieldDecoratorOptions;
    children?: any;
    render?: Function;
    form?: WrappedFormUtils;
    data?: Object;
}
