import classNames from 'classnames/bind';
import styles from './CheckOut.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CheckOut() {
    return (
        <div className={cx('checkout')}>
            <div className={cx('checkout__path')}>
                Home / <strong className={cx('checkout__path__current')}>Checkout</strong>
            </div>
            <div className={cx('checkout__billing')}>
                <p className={cx('checkout__billing__title')}>Billing details</p>
                <div className={cx('checkout__billing__name')}>
                    <label htmlFor="full-name">Full Name</label>
                    <input type="text" id="full-name" />
                </div>
                <div className={cx('checkout__billing__address')}>
                    <label htmlFor="address">Stress address</label>
                    <input type="text" id="address" placeholder="House number and street name" />
                </div>
                <div className={cx('checkout__billing__town')}>
                    <label htmlFor="town">Town / City</label>
                    <input type="text" id="town" />
                </div>
                <div className={cx('checkout__billing__phone')}>
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" id="phone" />
                </div>
                <div className={cx('checkout__billing__mail')}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
            </div>
            <div className={cx('checkout__order')}>
                <p className={cx('checkout__order__title')}>Your Order</p>
                <table className={cx('checkout__order__table')}>
                    <thead>
                        <tr className={cx('checkout__order__row')}>
                            <th className={cx('checkout__order__product')}>Product</th>
                            <th className={cx('checkout__order__total')}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cx('checkout__order__product__item')}>Plain White Shirt</td>
                            <td className={cx('checkout__order__product__price')}>$59.00</td>
                        </tr>
                        <tr className={cx('checkout__order__row')}>
                            <th className={cx('checkout__order__subtotal')}>Subtotal</th>
                            <th className={cx('checkout__order__price')}>$59.00</th>
                        </tr>
                        <tr className={cx('checkout__order__row')}>
                            <td className={cx('checkout__order__hr')}></td>
                            <td className={cx('checkout__order__total__price')}>$59.00</td>
                        </tr>
                    </tbody>
                </table>
                <div className={cx('checkout__order__delivery')}>
                    <p className={cx('checkout__order__delivery__description')}>
                        Cash on delivery. Please contact us if you require assistance or wish to make alternate
                        arrangements.
                    </p>
                    <Button large className={cx('checkout__order__btn')}>
                        Place order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
