import classNames from 'classnames/bind';
import styles from './ToastMessage.scss';

const cx = classNames.bind(styles);

function ToastMessage() {
    return <div className={cx('ToastMessage')}></div>;
}

export default ToastMessage;
