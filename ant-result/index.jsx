import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'antd/lib/icon/style';
import _Icon from 'antd/lib/icon';
import * as React from 'react';

import './index.less';
var iconMap = {
    error: React.createElement(_Icon, { className: 'error', type: 'close-circle' }),
    success: React.createElement(_Icon, { className: 'success', type: 'check-circle' })
};

var Result = function (_React$Component) {
    _inherits(Result, _React$Component);

    function Result() {
        _classCallCheck(this, Result);

        return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
    }

    _createClass(Result, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                type = _props.type,
                title = _props.title,
                description = _props.description,
                extra = _props.extra,
                actions = _props.actions,
                restProps = _objectWithoutProperties(_props, ['className', 'type', 'title', 'description', 'extra', 'actions']);

            return React.createElement(
                'div',
                _extends({ className: 'c-result ' + className }, restProps),
                React.createElement(
                    'div',
                    { className: 'icon' },
                    iconMap[type]
                ),
                React.createElement(
                    'div',
                    { className: 'title' },
                    title
                ),
                description && React.createElement(
                    'div',
                    { className: 'description' },
                    description
                ),
                extra && React.createElement(
                    'div',
                    { className: 'extra' },
                    extra
                ),
                actions && React.createElement(
                    'div',
                    { className: 'actions' },
                    actions
                )
            );
        }
    }]);

    return Result;
}(React.Component);

export { Result as default };