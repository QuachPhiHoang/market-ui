import { useRef } from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import CheckOutStep from '~/components/CheckOutStep';
import classNames from 'classnames/bind';
import styles from './Payment.scss';
import icons from '~/assets/icons';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '~/components/Button';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '~/service/axiosInterceptor';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '~/redux/order/orderSlice';

const cx = classNames.bind(styles);

function Payment() {
    const dispatch = useDispatch();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const navigate = useNavigate();

    const payBtn = useRef(null);
    const stripe = useStripe();
    const element = useElements();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.shipping);
    const { user } = useSelector((state) => state.user.user);
    const { error } = useSelector((state) => state.order);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItem: cartItems,
        itemsPrice: orderInfo.subtotalPrice,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandle = async (e) => {
        e.preventDefault();
        payBtn.current = true;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const { data } = await axiosInstance.post('payment/process', paymentData, config);

            const client_secrec = data.client_secret;

            if (!stripe || !element) return;

            const result = await stripe.confirmCardPayment(client_secrec, {
                payment_method: {
                    card: element.getElement(CardNumberElement),
                    billing_details: {
                        name: user.userName,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: `${shippingInfo.ward},${shippingInfo.district},${shippingInfo.city}`,
                        },
                    },
                },
            });
            if (result.error) {
                payBtn.current = false;
                toast.error(result.error.message);
            } else {
                if ((result.paymentIntent.status = 'succeeded')) {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    dispatch(createOrder(order));
                    toast.success('Paymen Success');
                    navigate('/success');
                } else {
                    toast.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current = false;
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Header />
            <CheckOutStep activeStep={2} />
            <div className={cx('payment')}>
                <div className={cx('payment__path')}>
                    Home / <strong className={cx('payment__path__current')}>Checkout</strong>
                </div>
                <div className={cx('payment__container')}>
                    <form className={cx('payment__container__form')} onSubmit={submitHandle}>
                        <div className={cx('payment__container__title')}>Payment Info</div>
                        <div className={cx('payment__container__number')}>
                            <img src={icons.payment_number} alt="payment__number" />
                            <CardNumberElement className={cx('payment__container__number__input')} />
                        </div>
                        <div className={cx('payment__container__expiry')}>
                            <img src={icons.payment_expiry} alt="payment__expiry" />
                            <CardExpiryElement className={cx('payment__container__expiry__input')} />
                        </div>
                        <div className={cx('payment__container__cvc')}>
                            <img src={icons.payment_cvc} alt="payment__cvc" />
                            <CardCvcElement className={cx('payment__container__cvc__input')} />
                        </div>
                        <Button
                            large
                            className={cx('payment__container__btn')}
                            forwardref={payBtn}
                            onClick={submitHandle}
                        >
                            {`Pay - ${orderInfo && orderInfo.totalPrice}$`}
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default Payment;
