import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import _typeof from "babel-runtime/helpers/typeof";
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from 'mobx-react';
import { createForm } from 'rc-form';
import { FormProvider, formConsumer } from '../base-form/form-context';
import { default as BaseFormRow } from '../base-form/form-row';
import { createFactory } from '../mobx-form';
export function createMobXForm(options) {
    return createFactory(createForm, options);
}
var FormRow = function (_BaseFormRow) {
    _inherits(FormRow, _BaseFormRow);

    function FormRow() {
        _classCallCheck(this, FormRow);

        return _possibleConstructorReturn(this, (FormRow.__proto__ || Object.getPrototypeOf(FormRow)).apply(this, arguments));
    }

    return FormRow;
}(BaseFormRow);
FormRow = __decorate([formConsumer, observer], FormRow);
export { FormRow };
export { FormProvider, formConsumer };