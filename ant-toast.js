import 'antd/lib/message/style';
import _message from 'antd/lib/message';

function changePromise(name) {
    var defaultDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

    return function (content) {
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDuration;

        _message.destroy();
        return new Promise(function (resolve) {
            return _message[name](content, duration, resolve);
        });
    };
}
var toast = {
    success: changePromise('success'),
    error: changePromise('error'),
    info: changePromise('info'),
    warning: changePromise('warning'),
    warn: changePromise('warn'),
    loading: changePromise('loading', 0),
    destroy: _message.destroy
};
export default toast;