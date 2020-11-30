import * as moment from 'moment';
export function randomString() {
    return Math.random().toString(36).substr(2, 9);
}
export function randomFileName(fileName) {
    var postfix = fileName.split('.').pop();
    return moment().format('YYMMDD') + '/' + randomString() + '.' + postfix;
}