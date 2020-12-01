import "antd/lib/form/style";
import _Form from "antd/lib/form";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import _typeof from "babel-runtime/helpers/typeof";
import _omit from "lodash/omit";
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';

import { observer } from 'mobx-react';
import { formConsumer } from '../base-form/form-context';
import { default as BaseFormRow } from '../base-form/form-row';

var FormRow = function (_BaseFormRow) {
    _inherits(FormRow, _BaseFormRow);

    function FormRow() {
        _classCallCheck(this, FormRow);

        return _possibleConstructorReturn(this, (FormRow.__proto__ || Object.getPrototypeOf(FormRow)).apply(this, arguments));
    }

    _createClass(FormRow, [{
        key: "render",
        value: function render() {
            var props = _omit(this.props, 'id', 'message', 'children');
            return React.createElement(
                _Form.Item,
                props,
                this.renderChildren()
            );
        }
    }]);

    return FormRow;
}(BaseFormRow);
FormRow = __decorate([formConsumer, observer], FormRow);
export default FormRow;