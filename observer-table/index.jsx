import "antd/lib/table/style";
import _Table from "antd/lib/table";
import "antd/lib/tooltip/style";
import _Tooltip from "antd/lib/tooltip";
import "antd/lib/tag/style";
import _Tag from "antd/lib/tag";
import _extends from "babel-runtime/helpers/extends";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import _typeof from "babel-runtime/helpers/typeof";
import _omit from "lodash/omit";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import _get from "lodash/get";
import _sumBy from "lodash/sumBy";
import _isPlainObject from "lodash/isPlainObject";
import _map from "lodash/map";
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';

import { isObservableArray, computed } from 'mobx';
import { observer, Observer } from 'mobx-react';
import * as moment from 'moment';
var ObserverTable = function (_React$Component) {
    _inherits(ObserverTable, _React$Component);

    function ObserverTable() {
        _classCallCheck(this, ObserverTable);

        var _this = _possibleConstructorReturn(this, (ObserverTable.__proto__ || Object.getPrototypeOf(ObserverTable)).apply(this, arguments));

        _this.columns = _this.formatColumns(_this.props.columns);
        return _this;
    }

    _createClass(ObserverTable, [{
        key: "formatColumns",
        value: function formatColumns(columns) {
            var _this2 = this;

            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

            return _map(columns, function (item, dataIndex) {
                var column = typeof item === 'string' ? { title: item } : _extends({}, item);
                column.key = dataIndex;
                column.width = column.width || width;
                column.align = column.align || 'center';
                if (_isPlainObject(column.children)) {
                    column.children = _this2.formatColumns(column.children, 80);
                    column.width = _sumBy(column.children, function (v) {
                        return v.width;
                    });
                    return column;
                }
                var render = column.type ? _this2.getRenderByType(column.type) : column.render;
                column.render = function (text, record, index) {
                    var getResult = function getResult() {
                        text = _get(record, dataIndex);
                        var result = render ? render(text, record, index) : text;
                        return _isNumber(result) || !_isEmpty(result) ? result : React.createElement(
                            "a",
                            { disabled: true },
                            "\u7A7A"
                        );
                    };
                    if (column.observer === false) {
                        return getResult();
                    } else {
                        return React.createElement(
                            Observer,
                            null,
                            getResult
                        );
                    }
                };
                return column;
            });
        }
    }, {
        key: "getRenderByType",
        value: function getRenderByType(type) {
            return {
                'boolean': function boolean(text) {
                    return text ? React.createElement(
                        _Tag,
                        { color: "blue" },
                        "\u662F"
                    ) : React.createElement(
                        _Tag,
                        { color: "red" },
                        "\u5426"
                    );
                },
                'text': function text(_text) {
                    return _text && React.createElement(
                        _Tooltip,
                        { title: _text, trigger: "click", overlayClassName: "long-text-tooltip" },
                        React.createElement(
                            "span",
                            { className: "long-text", style: {
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    overflow: 'hidden'
                                } },
                            _text
                        )
                    );
                },
                'date': function date(text) {
                    return text && moment(text).format('YYYY-MM-DD');
                },
                'datetime': function datetime(text) {
                    return text && React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            "span",
                            null,
                            moment(text).format('YYYY-MM-DD')
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "span",
                            null,
                            moment(text).format('HH:mm:ss')
                        )
                    );
                }
            }[type];
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            if (this.props.columns !== newProps.columns) this.columns = this.formatColumns(newProps.columns);
        }
    }, {
        key: "render",
        value: function render() {
            var columns = this.columns,
                dataSource = this.dataSource;

            return React.createElement(_Table, _extends({ className: "observer-table", rowKey: function rowKey(record) {
                    return record.id;
                }, scroll: { x: _sumBy(columns, function (v) {
                        return v.width;
                    }) + 100 }, columns: columns, dataSource: dataSource }, _omit(this.props, 'columns', 'dataSource')));
        }
    }, {
        key: "dataSource",
        get: function get() {
            var dataSource = this.props.dataSource;

            return isObservableArray(dataSource) ? dataSource.slice() : dataSource;
        }
    }]);

    return ObserverTable;
}(React.Component);
ObserverTable.defaultProps = {
    pagination: false
};
__decorate([computed], ObserverTable.prototype, "dataSource", null);
ObserverTable = __decorate([observer], ObserverTable);
export default ObserverTable;