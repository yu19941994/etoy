import moment from '../../node_modules/moment';

export default function (value) {
    return moment(value * 1000).format('Y/MM/DD, HH:mm:ss');
}