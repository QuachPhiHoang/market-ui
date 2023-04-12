import classNames from 'classnames/bind';
import styles from './Success.scss';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import icons from '~/assets/icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Success() {
    return (
        <div>
            <Header />
            <div className={cx('success')}>
                <div className={cx('success__icon')}>
                    <img src={icons.success} alt={'success__icon'} />
                </div>
                <div className={cx('success__title')}>Your Order has been Placed successfully</div>
                <Link className={cx('success__view')} to={'/orders'}>
                    View Order
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default Success;
