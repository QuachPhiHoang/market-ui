import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import icons from '~/assets/icons';
import styles from './Cart.scss';
import { updateItem, removeItem } from '~/redux/shopping/shopping';

const cx = classNames.bind(styles);

const totalPrice = (quantity, price) => {
    const Total = quantity * price;
    return Total;
};
function CartItem({ ...props }) {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(props.data);
    const [quantity, setQuantity] = useState(props.data.quantity);
    const quantityPrice = totalPrice(product.quantity, product.price);

    useEffect(() => {
        setProduct(props.data);
        setQuantity(props.data.quantity);
    }, [props.data]);

    const updateQuantity = (opt) => {
        if (opt === 'plus') {
            dispatch(updateItem({ ...props.data, quantity: quantity + 1 }));
        }
        if (opt === 'minus') {
            dispatch(updateItem({ ...props.data, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
        }
    };

    const removeItems = () => {
        dispatch(removeItem({ ...props.data }));
    };

    return (
        <table>
            <tbody>
                <tr className={cx('cart__table__row')}>
                    <td className={cx('cart__table__remove__icon')} onClick={() => removeItems()}>
                        <img src={icons.close} alt="close" />
                    </td>
                    <td className={cx('cart__table__product__details')}>
                        <img className={cx('cart__table__product__image')} src={product.product.img} alt="cart-shop" />
                        <p
                            className={cx('cart__table__product__name')}
                        >{`${product.product.title} - (${product.size} - ${product.color})`}</p>
                    </td>
                    <td className={cx('cart__table__price__details')}>{`$${product.product.price}.00`}</td>
                    <td className={cx('cart__table__quantity__details')}>
                        <div className={cx('cart__table__quantity__minus')} onClick={() => updateQuantity('minus')}>
                            -
                        </div>
                        <p className={cx('cart__table__quantity__info')}>{quantity}</p>
                        <div className={cx('cart__table__quantity__plus')} onClick={() => updateQuantity('plus')}>
                            +
                        </div>
                    </td>
                    <td className={cx('cart__table__total__details')}>{`$${quantityPrice}.00`}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default CartItem;
