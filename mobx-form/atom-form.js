import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _isEqual from 'lodash/isEqual';
import _toPath from 'lodash/toPath';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import { createAtom } from 'mobx';

import warning from 'warning';

var AtomForm = function () {
    function AtomForm(origin_form) {
        _classCallCheck(this, AtomForm);

        this.fields = {};
        this.checkObserver = createAtom('is_in_MobX');
        this.originForm = origin_form;
    }

    _createClass(AtomForm, [{
        key: 'getFieldDecorator',
        value: function getFieldDecorator(field_name, options) {
            var _this = this;

            return function (control) {
                var element = _this.originForm.getFieldDecorator(field_name, options)(control);
                var value = _this.originForm.getFieldValue(field_name);
                var errors = _this.originForm.getFieldError(field_name);
                warning(_this.fieldObserved(field_name), 'getFieldDecorator 需要跟 MobX 配合使用');
                Object.assign(_this.fields[field_name], { value: value, errors: errors });
                return element;
            };
        }
    }, {
        key: 'getFieldProps',
        value: function getFieldProps() {
            warning(false, 'getFieldProps 已废弃，请使用 getFieldDecorator');
            return {};
        }
    }, {
        key: 'getFieldValue',
        value: function getFieldValue(field_name) {
            var value = this.originForm.getFieldValue(field_name);
            this.afterGetOriginField(field_name, 'value', value);
            return value;
        }
    }, {
        key: 'getFieldsValue',
        value: function getFieldsValue(field_names) {
            var values = this.originForm.getFieldsValue(field_names);
            this.afterGetOriginField(field_names, 'value', values);
            return values;
        }
    }, {
        key: 'getFieldError',
        value: function getFieldError(field_name) {
            var error = this.originForm.getFieldError(field_name);
            this.afterGetOriginField(field_name, 'error', error);
            return error;
        }
    }, {
        key: 'getFieldsError',
        value: function getFieldsError(field_names) {
            var errors = this.originForm.getFieldsError(field_names);
            this.afterGetOriginField(field_names, 'error', errors);
            return errors;
        }
    }, {
        key: 'afterGetOriginField',
        value: function afterGetOriginField() {
            var id_or_ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.validFieldsName;

            var _this2 = this;

            var attr_name = arguments[1];
            var source_value = arguments[2];

            if (this.checkObserver.reportObserved()) {
                this.fieldsObserved([].concat(id_or_ids), function (full_name) {
                    var attr_value = _isArray(id_or_ids) ? _get(source_value, full_name) : _get(_set({}, id_or_ids, source_value), full_name);
                    Object.assign(_this2.fields[full_name], _defineProperty({}, attr_name, attr_value));
                });
            }
        }
    }, {
        key: 'fieldsObserved',
        value: function fieldsObserved(field_names, setFiledAttr) {
            var _this3 = this;

            field_names.forEach(function (field_name) {
                var full_names = _this3.getValidFieldsFullNames(field_name);
                full_names.length === 0 && full_names.push(field_name);
                full_names.forEach(function (full_name) {
                    _this3.fieldObserved(full_name);
                    setFiledAttr(full_name);
                });
            });
        }
    }, {
        key: 'fieldObserved',
        value: function fieldObserved(field_name) {
            var _this4 = this;

            if (!(field_name in this.fields)) {
                this.fields[field_name] = {
                    atom: createAtom(field_name + '_changed', void 0, function () {
                        delete _this4.fields[field_name];
                    })
                };
            }
            return this.fields[field_name].atom.reportObserved();
        }
    }, {
        key: 'getValidFieldsFullNames',
        value: function getValidFieldsFullNames(name) {
            return this.validFieldsName.filter(function (field_name) {
                var name_path = [].concat(_toPath(name));
                var field_name_path = [].concat(_toPath(field_name));
                return _isEqual(name_path, field_name_path.slice(0, name_path.length));
            });
        }
    }, {
        key: 'validFieldsName',
        get: function get() {
            return Object.keys(this.fields);
        }
    }]);

    return AtomForm;
}();

export { AtomForm as default };