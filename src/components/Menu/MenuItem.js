import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.scss';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <div className={cx('menu__item')}>
            <img className={cx('menu__item__icon')} src={data.icon} alt="icon" />
            <Button text to={data.to} onClick={data.func}>
                <div className={cx('menu__item__title')}>{data.title}</div>
            </Button>
        </div>
    );
}

export default MenuItem;
