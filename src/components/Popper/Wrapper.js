import classNames from 'classnames/bind';
import styles from './Wrapper.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) {
    return <div className={cx('popper', className)}>{children}</div>;
}

export default Wrapper;
