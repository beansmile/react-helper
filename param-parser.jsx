import _extends from 'babel-runtime/helpers/extends';
import _typeof from 'babel-runtime/helpers/typeof';
import _mapValues from 'lodash/mapValues';
import * as React from 'react';

import * as qs from 'qs';
import decoder from './decoder';
function paramParser(arg) {
    if (['string', 'undefined'].includes(typeof arg === 'undefined' ? 'undefined' : _typeof(arg))) return function (Page) {
        return paramParserDecorator(Page, arg);
    };else return paramParserDecorator(arg);
}
function paramParserDecorator(Page, pageKey) {
    return function ParamParser(props) {
        var location = props.location,
            match = props.match;

        var params = _mapValues(match.params, decoder);
        var query = qs.parse(location.search.replace(/^\?/, ''), { decoder: decoder });
        Object.assign(params, query, location.state, { location_key: location.key });
        return React.createElement(Page, _extends({ key: params[pageKey] }, props, { params: params }));
    };
}
export default paramParser;