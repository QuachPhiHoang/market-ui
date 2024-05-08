import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import icons from '~/assets/icons';
import styles from './Cart.scss';
import { removeItemsFromCart, updateItemsFromCart } from '~/redux/cart/cartSlice';

const cx = classNames.bind(styles);

const totalPrice = (quantity, price) => {
    const Total = quantity * price;
    return Total;
};
function CartItem({ product }) {
    const dispatch = useDispatch();
    const [products, setProducts] = useState(product);
    const [quantity, setQuantity] = useState(product.quantity);
    const quantityPrice = totalPrice(quantity, product.price);

    useEffect(() => {
        setProducts(product);
        setQuantity(product.quantity);
    }, [product]);

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        if (products.stock < newQuantity) {
            return;
        }
        dispatch(updateItemsFromCart({ products, newQuantity }));
        setQuantity(newQuantity);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const newQuantity = quantity - 1;
        dispatch(updateItemsFromCart({ products, newQuantity }));
        setQuantity(newQuantity);
    };

    const removeItems = () => {
        console.log('products', products);
        dispatch(removeItemsFromCart(products));
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
                            <img
                                className={cx('cart__table__product__image')}
                                src={product?.image.url}
                                alt="cart-shop"
                            />
                            <p
                                className={cx('cart__table__product__name')}
                            >{`${product?.name} - (${product?.size} - ${product?.color})`}</p>
                        </td>
                        <td className={cx('cart__table__price__details')}>{`$${product?.price}.00`}</td>
                        <td className={cx('cart__table__quantity__details')}>
                            <div className={cx('cart__table__quantity__minus')} onClick={() => decreaseQuantity()}>
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
