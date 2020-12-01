import 'antd/lib/form/style';
import _Form from 'antd/lib/form';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _omit from 'lodash/omit';
import * as React from 'react';

import { FormProvider } from '../base-form/form-context';
import { createFactory } from '../mobx-form';

var FormGroup = function (_React$Component) {
    _inherits(FormGroup, _React$Component);

    function FormGroup() {
        _classCallCheck(this, FormGroup);

        return _possibleConstructorReturn(this, (FormGroup.__proto__ || Object.getPrototypeOf(FormGroup)).apply(this, arguments));
    }

    _createClass(FormGroup, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                form = _props.form,
                data = _props.data,
                props = _objectWithoutProperties(_props, ['className', 'form', 'data']);

            var formElement = React.createElement(_Form, _extends({ className: 'form-group ' + className }, props));
            if (form) {
                return React.createElement(
                    FormProvider,
                    { value: { form: form, data: data } },
                    formElement
                );
            } else {
                return formElement;
            }
        }
    }], [{
        key: 'create',
        value: function create(options) {
            return createFactory(_Form.create, options);
        }
    }]);

    return FormGroup;
}(React.Component);

export { FormGroup as default };

FormGroup.defaultProps = _omit(_Form.defaultProps, 'onSubmit');