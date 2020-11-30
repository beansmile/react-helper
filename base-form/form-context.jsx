import _extends from 'babel-runtime/helpers/extends';
import * as React from 'react';

var _React$createContext = React.createContext({
    form: {},
    data: {}
}),
    FormProvider = _React$createContext.Provider,
    FormConsumer = _React$createContext.Consumer;

export { FormProvider, FormConsumer };

export function formConsumer(Target) {
    return function FormConsumerEntry(props) {
        return React.createElement(
            FormConsumer,
            null,
            function (value) {
                return React.createElement(Target, _extends({}, props, value));
            }
        );
    };
}