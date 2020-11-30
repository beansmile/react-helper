import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _get from 'lodash/get';
import * as React from 'react';

var FormRow = function (_React$Component) {
    _inherits(FormRow, _React$Component);

    function FormRow() {
        _classCallCheck(this, FormRow);

        return _possibleConstructorReturn(this, (FormRow.__proto__ || Object.getPrototypeOf(FormRow)).apply(this, arguments));
    }

    _createClass(FormRow, [{
        key: 'renderChildren',
        value: function renderChildren() {
            if (!this.props.id) return this.props.children;
            var _props = this.props,
                form = _props.form,
                id = _props.id,
                children = _props.children,
                render = _props.render,
                required = _props.required,
                rule = _props.rule,
                _props$options = _props.options;
            _props$options = _props$options === undefined ? {} : _props$options;

            var _props$options$valueP = _props$options.valuePropName,
                valuePropName = _props$options$valueP === undefined ? 'value' : _props$options$valueP,
                _props$options$rules = _props$options.rules,
                rules = _props$options$rules === undefined ? [] : _props$options$rules,
                options = _objectWithoutProperties(_props$options, ['valuePropName', 'rules']);

            var fieldOptions = _extends({
                valuePropName: valuePropName,
                rules: rules.concat(_extends({ required: required, message: this.message, whitespace: true }, rule))
            }, options, {
                initialValue: this.initialValue
            });
            var wrapper = function wrapper(control) {
                return form.getFieldDecorator(id, fieldOptions)(control);
            };
            return typeof render === 'function' ? render(wrapper) : wrapper(children);
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderChildren();
        }
    }, {
        key: 'message',
        get: function get() {
            var _props2 = this.props,
                message = _props2.message,
                label = _props2.label;

            return message || (label ? '\u65E0\u6548\u7684' + label : '');
        }
    }, {
        key: 'initialValue',
        get: function get() {
            var _props3 = this.props,
                id = _props3.id,
                _props3$options = _props3.options,
                options = _props3$options === undefined ? {} : _props3$options,
                data = _props3.data,
                transInitial = _props3.transInitial;

            return transInitial(_get(data, id, options.initialValue));
        }
    }]);

    return FormRow;
}(React.Component);

export { FormRow as default };

FormRow.defaultProps = {
    required: true,
    transInitial: function transInitial(value) {
        return value;
    }
};