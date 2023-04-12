import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ConfirmOrder.scss';
import YourOrder from './YourOrder';
import Button from '~/components/Button';
import CheckOutStep from '~/components/CheckOutStep';

const cx = classNames.bind(styles);

function ConfirmOrder() {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.shipping);
    const shipping = JSON.parse(localStorage.getItem('shippingInfo'));
    useEffect(() => {
        if (Object.keys(shipping).length === 0) {
            navigate('/shipping');
        }
    }, [navigate, shipping]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [subtotalPrice, setSubTotalPrice] = useState(0);
    useEffect(() => {
        setTotalProducts(cartItems.reduce((arr, cur) => arr + cur.quantity, 0));
        setSubTotalPrice(cartItems.reduce((arr, cur) => arr + cur.quantity * cur.price, 0));
    }, [cartItems]);
    const shippingCharges = subtotalPrice > 1000 ? 0 : 80;

    const totalPrice = subtotalPrice + shippingCharges;
    const goToPayment = () => {
        const data = {
            subtotalPrice,
            shippingCharges,
            totalPrice,
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };
    return (
        <div className={cx('order')}>
            Home / <strong className={cx('order__path__current')}>Checkout</strong>
            <CheckOutStep activeStep={1} />
            <div className={cx('order__shipping')}>
                <p className={cx('order__shipping__title')}>Shipping Info</p>
                <div className={cx('order__shipping__info')}>
                    <p className={cx('order__shipping__info-name')}>
                        <strong>Name:</strong>
                        {shippingInfo?.fullName}
                    </p>
                    <p className={cx('order__shipping__info-address')}>
                        <strong>Address:</strong>
                        {`${shippingInfo?.address}, ${shippingInfo?.ward}, ${shippingInfo?.district}, ${shippingInfo?.city}`}
                    </p>
                    <p className={cx('order__shipping__info-phone')}>
                        <strong>Phone:</strong>
                        {shippingInfo?.phone}
                    </p>
                </div>
            </div>
            <div className={cx('order__info__')}>
                <p className={cx('order__info__title')}>Your Order</p>
                <table className={cx('order__info__table')}>
                    <thead>
                        <tr className={cx('order__info__row')}>
                            <th className={cx('order__info__product')}>Product</th>
                            <th className={cx('order__info__total')}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems && cartItems.map((items, index) => <YourOrder data={items} key={index} />)}
                        <tr className={cx('order__info__row')}>
                            <th className={cx('order__info__subtotal')}>{`Subtotal: ${totalProducts} items`}</th>
                            <th className={cx('order__info__subtotal__price')}>{`$${subtotalPrice}.00`}</th>
                        </tr>
                        <tr className={cx('order__info__row')}>
                            <th className={cx('order__info__subtotal')}>{`Shipping Charges `}</th>
                            <th className={cx('order__info__subtotal__price')}>{`$${shippingCharges}.00`}</th>
                        </tr>
                        <tr className={cx('order__info__row')}>
                            <td className={cx('order__info__hr')}></td>
                            <td className={cx('order__info__total__price')}>{`$${totalPrice}.00`}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={cx('order__info__delivery')}>
                    <p className={cx('order__info__delivery__description')}>
                        Cash on delivery. Please contact us if you require assistance or wish to make alternate
                        arrangements.
                    </p>
                    <Button large className={cx('order__btn')} onClick={goToPayment}>
                        Payment
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
