import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './OrderDetails.scss';
import { getOrderDetails } from '~/redux/order/orderDetailsSlice';

const cx = classNames.bind(styles);

function OrderDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);

    const { order } = useSelector((state) => state.orderDetails);
    console.log(order);

    return (
        <div>
            <Header />
            <div className={cx('order-details')}>
                <div className={cx('order-details__heading')}>Order #{order && order?.order?._id}</div>
                <div className={cx('order-details__container')}>
                    <div className={cx('order-details__container__shipping-info')}>
                        <p className={cx('order-details__container__shipping-info__title')}>Shipping Info</p>
                        <div className={cx('order-details__container__shipping-info__name')}>
                            <p>Name: </p>
                            <span>{order && order?.order?.user?.username}</span>
                        </div>
                        <div className={cx('order-details__container__shipping-info__phone')}>
                            <p>Phone: </p>
                            <span>{order && order?.order?.shippingInfo?.phone}</span>
                        </div>
                        <div className={cx('order-details__container__shipping-info__address')}>
                            <p>Address: </p>
                            <span>
                                {order &&
                                    `${order?.order?.shippingInfo?.address}, ${order?.order?.shippingInfo?.ward}, ${order?.order?.shippingInfo?.district}, ${order?.order?.shippingInfo?.city}`}
                            </span>
                        </div>
                    </div>
                    <div className={cx('order-details__container__payment')}>
                        <p className={cx('order-details__container__payment__title')}>Payment</p>
                        <div className={cx('order-details__container__payment__info')}>
                            {order?.order?.paymentInfo?.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                        </div>
                        <div className={cx('order-details__container__payment__amount')}>
                            <p>Amount:</p>
                            <span>{order && order?.order?.totalPrice} $</span>
                        </div>
                    </div>
                    <div className={cx('order-details__container__order-status')}>
                        <p className={cx('order-details__container__order-status__title')}>Order Status</p>
                        <div
                            className={cx(
                                `order-details__container__order-status__info ${
                                    order?.order?.orderStatus === 'Processing' ? '' : 'active'
                                }`,
                            )}
                        >
                            {order && order?.order?.orderStatus}
                        </div>
                    </div>
                    <div className={cx('order-details__container__order-items')}>
                        <p className={cx('order-details__container__order-items__title')}>Order Items</p>
                        <div className={cx('order-details__container__order-items__cart')}>
                            {order &&
                                order?.order?.orderItem.map((item) => (
                                    <div
                                        className={cx('order-details__container__order-items__cart__item')}
                                        key={item.product}
                                    >
                                        <img
                                            className={cx('order-details__container__order-items__cart__item__image')}
                                            src={item.image}
                                            alt={`item`}
                                        />
                                        <div className={cx('order-details__container__order-items__cart__item__name')}>
                                            {`${item.name} - ${item.size} - ${item.color}`}
                                        </div>
                                        <div className={cx('order-details__container__order-items__cart__item__price')}>
                                            <p>
                                                {item.quantity} X {item.price} =
                                            </p>
                                            <span>{item.quantity * item.price} $</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OrderDetails;
