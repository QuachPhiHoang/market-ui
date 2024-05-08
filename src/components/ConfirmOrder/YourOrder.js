import classNames from 'classnames/bind';
import styles from './ConfirmOrder.scss';
const cx = classNames.bind(styles);

function YourOrder({ data }) {
    const totalPrice = (quantity, price) => {
        const Total = quantity * price;
        return Total;
    };
    const quantityPrice = totalPrice(data.quantity, data.price);
    return (
        <tr>
            <td className={cx('order__info__product__item')}>
                <img src={data?.image?.url} alt="items" />
                <p>{`${data.name} ( ${data.quantity} item )`}</p>
            </td>
            <td className={cx('order__info__product__price')}>{`$${quantityPrice}.00`}</td>
        </tr>
    );
}

export default YourOrder;
