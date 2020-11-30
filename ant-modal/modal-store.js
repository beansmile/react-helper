import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
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
import { StoreHelper, observable, action } from 'mobx-multiple-store';
import { randomString } from '../random';

var ModalStore = function (_StoreHelper) {
    _inherits(ModalStore, _StoreHelper);

    function ModalStore() {
        _classCallCheck(this, ModalStore);

        var _this = _possibleConstructorReturn(this, (ModalStore.__proto__ || Object.getPrototypeOf(ModalStore)).apply(this, arguments));

        _this.visible = false;
        _this.confirmLoading = false;
        return _this;
    }

    _createClass(ModalStore, [{
        key: "showModal",
        value: function showModal() {
            this.visible = true;
        }
    }, {
        key: "hideModal",
        value: function hideModal() {
            this.visible = false;
        }
    }], [{
        key: "get",
        value: function get() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : randomString();

            return this.findOrCreate(key);
        }
    }, {
        key: "showModal",
        value: function showModal(key) {
            return this.findOrCreate(key).showModal();
        }
    }, {
        key: "hideModal",
        value: function hideModal(key) {
            return this.findOrCreate(key).hideModal();
        }
    }]);

    return ModalStore;
}(StoreHelper);

export { ModalStore as default };

__decorate([observable], ModalStore.prototype, "visible", void 0);
__decorate([observable], ModalStore.prototype, "confirmLoading", void 0);
__decorate([action.bound], ModalStore.prototype, "showModal", null);
__decorate([action.bound], ModalStore.prototype, "hideModal", null);