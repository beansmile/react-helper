import _extends from "babel-runtime/helpers/extends";
import "antd/lib/modal/style";
import _Modal from "antd/lib/modal";
import "antd/lib/drawer/style";
import _Drawer from "antd/lib/drawer";
import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
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
var CModal_1;
import * as React from 'react';

import { observer } from 'mobx-react';
import { asyncAction } from 'mobx-multiple-store';
import autoBind from 'core-decorators/lib/autobind';
import ModalStore from './modal-store';
var CModal = CModal_1 = function (_React$Component) {
    _inherits(CModal, _React$Component);

    function CModal() {
        _classCallCheck(this, CModal);

        var _this = _possibleConstructorReturn(this, (CModal.__proto__ || Object.getPrototypeOf(CModal)).apply(this, arguments));

        _this.modalStore = _this.getStore();
        return _this;
    }

    _createClass(CModal, [{
        key: "getStore",
        value: function getStore() {
            var modalStore = this.props.modalStore || ModalStore.get();
            modalStore.onOk = this.onOk;
            modalStore.onCancel = this.onCancel;
            return modalStore;
        }
    }, {
        key: "onOk",
        value: /*#__PURE__*/regeneratorRuntime.mark(function onOk(event) {
            var result;
            return regeneratorRuntime.wrap(function onOk$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            this.modalStore.confirmLoading = true;
                            _context.prev = 1;
                            _context.next = 4;
                            return this.props.onOk(event);

                        case 4:
                            result = _context.sent;

                            if (result !== false) this.modalStore.hideModal();

                        case 6:
                            _context.prev = 6;

                            this.modalStore.confirmLoading = false;
                            return _context.finish(6);

                        case 9:
                        case "end":
                            return _context.stop();
                    }
                }
            }, onOk, this, [[1,, 6, 9]]);
        })
    }, {
        key: "showModal",
        value: function showModal(e) {
            // a 标签处理
            if (e.target.href) {
                // ctrl + 点击时，不弹出 modal，按浏览器默认行为处理。否则，阻止默认行为。
                if (CModal_1.keyCode !== 91) {
                    e.preventDefault();
                    this.modalStore.showModal();
                }
            } else {
                this.modalStore.showModal();
            }
        }
    }, {
        key: "onCancel",
        value: function onCancel(e) {
            this.props.onCancel(e);
            this.props.onClose(e);
            this.modalStore.hideModal();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            ModalStore.instanceList.delete(this.modalStore.instanceKey);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                trigger = _props.trigger,
                children = _props.children,
                render = _props.render,
                useDrawer = _props.useDrawer,
                props = _objectWithoutProperties(_props, ["trigger", "children", "render", "useDrawer"]);

            var _modalStore = this.modalStore,
                visible = _modalStore.visible,
                confirmLoading = _modalStore.confirmLoading;

            var Container = useDrawer ? _Drawer : _Modal;
            return React.createElement(
                React.Fragment,
                null,
                React.isValidElement(trigger) ? React.cloneElement(trigger, { onClick: this.showModal }) : trigger(this.modalStore),
                React.createElement(
                    Container,
                    _extends({ visible: visible, confirmLoading: confirmLoading }, props, { onOk: this.onOk, onCancel: this.onCancel, onClose: this.onCancel }),
                    render ? render(this.modalStore) : children
                )
            );
        }
    }]);

    return CModal;
}(React.Component);
CModal.defaultProps = {
    destroyOnClose: true,
    onOk: function onOk() {
        return void 0;
    },
    onCancel: function onCancel() {
        return void 0;
    },
    onClose: function onClose() {
        return void 0;
    }
};
CModal.keyCode = void 0;
__decorate([asyncAction], CModal.prototype, "onOk", null);
__decorate([autoBind], CModal.prototype, "showModal", null);
__decorate([autoBind], CModal.prototype, "onCancel", null);
CModal = CModal_1 = __decorate([observer], CModal);
export default CModal;
document.addEventListener('keydown', function (e) {
    CModal.keyCode = e.keyCode;
});
document.addEventListener('keyup', function () {
    CModal.keyCode = void 0;
});