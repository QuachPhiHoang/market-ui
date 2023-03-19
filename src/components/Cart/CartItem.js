import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import icons from '~/assets/icons';
import styles from './Cart.scss';
// import { updateItem, removeItem } from '~/redux/shopping/shopping';
import { removeItemsFromCart } from '~/redux/cart/cartSlice';

const cx = classNames.bind(styles);

const totalPrice = (quantity, price) => {
    const Total = quantity * price;
    return Total;
};
function CartItem({ product }) {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(product);
    // console.log(product);
    const [quantity, setQuantity] = useState(product.quantity);
    const quantityPrice = totalPrice(product.quantity, product.price);
    // console.log(product);

    useEffect(() => {
        setProducts(product);
        setQuantity(product.quantity);
    }, [product]);

    // const updateQuantity = (opt) => {
    //     if (opt === 'plus') {
    //         dispatch(updateItem({ ...props.data, quantity: quantity + 1 }));
    //     }
    //     if (opt === 'minus') {
    //         dispatch(updateItem({ ...props.data, quantity: quantity - 1 === 0 ? 1 : quantity - 1 }));
    //     }
    // };

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const removeItems = () => {
        try {
            dispatch(removeItemsFromCart(product.product));
            console.log('Item removed successfully!');
        } catch (error) {
            console.log(`Failed to remove item: ${error}`);
        }
    };

    return (
        <table>
            <tbody>
                {products ? (
                    <tr className={cx('cart__table__row')}>
                        <td className={cx('cart__table__remove__icon')} onClick={() => removeItems()}>
                            <img src={icons.close} alt="close" />
                        </td>
                        <td className={cx('cart__table__product__details')}>
                            <img className={cx('cart__table__product__image')} src={product?.image} alt="cart-shop" />
                            <p
                                className={cx('cart__table__product__name')}
                            >{`${product?.name} - (${product?.size} - ${product?.color})`}</p>
                        </td>
                        <td className={cx('cart__table__price__details')}>{`$${product?.price}.00`}</td>
                        <td className={cx('cart__table__quantity__details')}>
                            <div
                                className={cx('cart__table__quantity__minus')}
                                onClick={() => decreaseQuantity('minus')}
                            >
                                -
                            </div>
                            <p className={cx('cart__table__quantity__info')}>{quantity}</p>
                            <div className={cx('cart__table__quantity__plus')} onClick={() => increaseQuantity()}>
                                +
                            </div>
                        </td>
                        <td className={cx('cart__table__total__details')}>{`$${quantityPrice}.00`}</td>
                    </tr>
                ) : null}
            </tbody>
        </table>
    );
}

export default CartItem;
