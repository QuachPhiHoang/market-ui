import classNames from 'classnames/bind';
import styles from './Benefit.scss';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);

function Benefit() {
    return (
        <div className={cx('benefit')}>
            <div className={cx('benefit-item')}>
                <div className={cx('benefit-item__icon')}>
                    <img src={icons.free} alt="free" />
                </div>
                <div className={cx('benefit-item__info')}>
                    <p className={cx('benefit-item__title')}>Free Shipping</p>
                    <p className={cx('benefit-item__description')}>Enjoy free shipping on all orders above $100</p>
                </div>
            </div>
            <div className={cx('benefit-item')}>
                <div className={cx('benefit-item__icon')}>
                    <img src={icons.support} alt="free" />
                </div>
                <div className={cx('benefit-item__info')}>
                    <p className={cx('benefit-item__title')}>SUPPORT 24/7</p>
                    <p className={cx('benefit-item__description')}>Our support team is there to help you for queries</p>
                </div>
            </div>
            <div className={cx('benefit-item')}>
                <div className={cx('benefit-item__icon')}>
                    <img src={icons.return} alt="free" />
                </div>
                <div className={cx('benefit-item__info')}>
                    <p className={cx('benefit-item__title')}>30 DAYS RETURN</p>
                    <p className={cx('benefit-item__description')}>Simply return it within 30 days for an exchange.</p>
                </div>
            </div>
            <div className={cx('benefit-item')}>
                <div className={cx('benefit-item__icon')}>
                    <img src={icons.pay} alt="free" />
                </div>
                <div className={cx('benefit-item__info')}>
                    <p className={cx('benefit-item__title')}>100% PAYMENT SECURE</p>
                    <p className={cx('benefit-item__description')}>Our payments are secured with 256 bit encryption</p>
                </div>
            </div>
        </div>
    );
}

export default Benefit;
