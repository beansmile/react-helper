import * as React from 'react';
import { FormProps } from 'antd/lib/form/Form';
export default class FormGroup extends React.Component {
    static defaultProps: any;
    static create(options?: any): (Target: any) => any;
    props: FormProps & {
        data?: Object;
    };
    render(): JSX.Element;
}
