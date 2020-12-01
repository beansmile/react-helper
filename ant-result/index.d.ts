import * as React from 'react';
import './index.less';
export default class Result extends React.Component {
    props: {
        type: 'success' | 'error';
        title: string;
        className?: string;
        description?: any;
        extra?: any;
        actions?: any;
    };
    render(): JSX.Element;
}
