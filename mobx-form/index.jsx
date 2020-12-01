import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';
import _omit from 'lodash/omit';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import * as React from 'react';

import AtomForm from './atom-form';
export * from 'rc-form';
export function createFactory(rcFormCreate, options) {
    var wrapper = rcFormCreate(options);
    var formPropName = _get(options, 'formPropName', 'form');
    return function (Target) {
        var MobXForm = function (_React$Component) {
            _inherits(MobXForm, _React$Component);

            function MobXForm() {
                _classCallCheck(this, MobXForm);

                var _this = _possibleConstructorReturn(this, (MobXForm.__proto__ || Object.getPrototypeOf(MobXForm)).apply(this, arguments));

                _this.atomForm = new AtomForm(_this.formProp);
                _this.form = _extends({}, _this.formProp, {
                    validateFields: function validateFields() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        return validateMethodChange(args, _this.formProp.validateFields);
                    },
                    validateFieldsAndScroll: function validateFieldsAndScroll() {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        return validateMethodChange(args, _this.formProp.validateFieldsAndScroll);
                    },
                    getFieldValue: _this.atomForm.getFieldValue.bind(_this.atomForm),
                    getFieldsValue: _this.atomForm.getFieldsValue.bind(_this.atomForm),
                    getFieldError: _this.atomForm.getFieldError.bind(_this.atomForm),
                    getFieldsError: _this.atomForm.getFieldsError.bind(_this.atomForm),
                    getFieldDecorator: _this.atomForm.getFieldDecorator.bind(_this.atomForm),
                    getFieldProps: _this.atomForm.getFieldProps,
                    origin: _this.formProp
                });
                return _this;
            }

            _createClass(MobXForm, [{
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    return !_isEqual(_omit(this.props, formPropName), _omit(nextProps, formPropName));
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps() {
                    var values = this.formProp.getFieldsValue();
                    var error_list = this.formProp.getFieldsError();
                    _forEach(this.atomForm.fields, function (field, key) {
                        if (field.value !== _get(values, key) || field.error !== _get(error_list, key)) {
                            field.atom.reportChanged();
                        }
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    return React.createElement(Target, _extends({}, this.props, _defineProperty({}, formPropName, this.form)));
                }
            }, {
                key: 'formProp',
                get: function get() {
                    return this.props[formPropName];
                }
            }]);

            return MobXForm;
        }(React.Component);

        return wrapper(MobXForm);
    };
}
function validateMethodChange(args, func) {
    return new Promise(function (resolve, reject) {
        func.apply(undefined, _toConsumableArray(args).concat([function (error, values) {
            try {
                if (error) {
                    var err = new Error();
                    err['result'] = error;
                    err['sentry_ignore'] = true;
                    err.message = _map(error, function (value) {
                        return _map(value.errors, function (value) {
                            return value.message;
                        }).join('\n');
                    }).join('\n');
                    reject(err);
                } else {
                    resolve(values);
                }
            } catch (e) {
                reject(e);
            }
        }]));
    });
}