import * as React from 'react';
import { TableProps } from 'antd/lib/table/interface';
export default class ObserverTable extends React.Component {
    static defaultProps: {
        pagination: boolean;
    };
    props: TableProps<Object> & {
        columns?: {
            [column: string]: {
                title: string;
                type?: string;
                observer: boolean;
                render?: Function;
            } | string;
        };
    };
    columns: any;
    formatColumns(columns: any, width?: number): any;
    getRenderByType(type: any): any;
    readonly dataSource: any[];
    componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
}
declare module 'react' {
    interface AnchorHTMLAttributes<T> {
        disabled: boolean;
    }
}
