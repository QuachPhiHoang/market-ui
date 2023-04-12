import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Cart.scss';
import Button from '~/components/Button';
import CartItem from './CartItem';

const cx = classNames.bind(styles);

function Cart() {
    const { cartItems } = useSelector((state) => state.cart);
    const [totalProducts, setTotalProducts] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    const backToCatalog = () => {
        navigate('/category');
    };
    const CheckOut = () => {
        if (cartItems.length > 0) {
            navigate('/shipping');
        }
    };
    useEffect(() => {
        setTotalProducts(cartItems.reduce((arr, cur) => arr + cur.quantity, 0));
        setTotalPrice(cartItems.reduce((arr, cur) => arr + cur.quantity * cur.price, 0));
    }, [cartItems]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={cx('cart')}>
            <div className={cx('cart__path')}>
                <p>
                    Home / <strong>Shopping Cart</strong>
                </p>
            </div>
            <div className={cx('cart__table')}>
                <table>
                    <tbody>
                        <tr className={cx('cart__table__row')}>
                            <th className={cx('cart__table__remove')}></th>
                            <th className={cx('cart__table__product')}>Product</th>
                            <th className={cx('cart__table__price')}>Price</th>
                            <th className={cx('cart__table__quantity')}>Quantity</th>
                            <th className={cx('cart__table__total')}>Total</th>
                        </tr>
                    </tbody>
                </table>
                {cartItems && cartItems.map((item, index) => <CartItem key={index} product={item} />)}
            </div>
            <div className={cx('cart__coupon')}>
                <p className={cx('cart__coupon__title')}>Cart Totals</p>
                <div className={cx('cart__coupon__subtotal')}>
                    <p className={cx('cart__coupon__subtotal__title')}>{`Subtotal: ${totalProducts} items`}</p>

                    <p className={cx('cart__coupon__subtotal__price')}>{`$${totalPrice}.00`}</p>
                </div>
                <div className={cx('cart__coupon__shipping')}>
                    <p className={cx('cart__coupon__shipping__title')}>Shipping Free</p>
                    <p className={cx('cart__coupon__shipping__price')}>Free!!!</p>
                </div>
                <div className={cx('cart__coupon__total')}>
                    <strong className={cx('cart__coupon__total__title')}>Total</strong>
                    <p className={cx('cart__coupon__total__price')}>{`$${totalPrice}.00`}</p>
                </div>
            </div>
            {cartItems && cartItems.length > 0 ? (
                <Button large className={cx('btn')} onClick={() => CheckOut()}>
                    Proceed to Checkout
                </Button>
            ) : (
                <Button large disable className={cx('checkout-btn')}>
                    Proceed to Checkout
                </Button>
            )}
            <Button large className={cx('back-btn')} onClick={() => backToCatalog()}>
                Back to Catalog
            </Button>
        </div>
    );
}

export default Cart;
