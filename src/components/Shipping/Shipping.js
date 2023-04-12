import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Shipping.scss';
import Button from '~/components/Button';
import CheckOutStep from '~/components/CheckOutStep';
import { saveShippingInfo } from '~/redux/shippingInfo/shippingInfoSlice';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Shipping() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.shipping);
    const [fullName, SetFullName] = useState(shippingInfo.fullName);
    const [address, SetAddress] = useState(shippingInfo.address);
    const [city, SetCity] = useState(shippingInfo.city);
    const [district, SetDistrict] = useState(shippingInfo.district);
    const [ward, SetWard] = useState(shippingInfo.ward);
    const [phone, SetPhone] = useState(shippingInfo.phone);
    const [email, SetEmail] = useState(shippingInfo.email);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (
            (phone.length < 10 || phone.length > 10) &&
            fullName.trim().length === 0 &&
            address.trim().length === 0 &&
            ward.trim().length === 0 &&
            district.trim().length === 0 &&
            city.trim().length === 0 &&
            email.trim().length === 0
        ) {
            toast.error('Please enter your form before Place Order');
        } else {
            dispatch(saveShippingInfo({ fullName, address, ward, city, district, phone, email }));
            navigate('/confirm-order');
        }
    };
    return (
        <div className={cx('shipping')}>
            <div className={cx('shipping__path')}>
                Home / <strong className={cx('shipping__path__current')}>Checkout</strong>
            </div>
            <CheckOutStep activeStep={0} />
            <form className={cx('shippingForm')} encType="multipart/form-data" onSubmit={shippingSubmit}>
                <div className={cx('shipping__billing')}>
                    <p className={cx('shipping__billing__title')}>Shipping details</p>
                    <div className={cx('shipping__billing__name')}>
                        <label htmlFor="full-name">Full Name</label>
                        <input
                            type="text"
                            id="full-name"
                            value={fullName}
                            onChange={(e) => SetFullName(e.target.value)}
                        />
                    </div>
                    <div className={cx('shipping__billing__address')}>
                        <label htmlFor="address">Stress address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="House number and street name"
                            value={address}
                            onChange={(e) => SetAddress(e.target.value)}
                        />
                    </div>
                    <div className={cx('shipping__billing__ward')}>
                        <label htmlFor="town">Ward</label>
                        <input type="text" id="ward" value={ward} onChange={(e) => SetWard(e.target.value)} />
                    </div>
                    <div className={cx('shipping__billing__district')}>
                        <label htmlFor="town">District</label>
                        <input
                            type="text"
                            id="district"
                            value={district}
                            onChange={(e) => SetDistrict(e.target.value)}
                        />
                    </div>
                    <div className={cx('shipping__billing__town')}>
                        <label htmlFor="town">City</label>
                        <input type="text" id="town" value={city} onChange={(e) => SetCity(e.target.value)} />
                    </div>
                    <div className={cx('shipping__billing__phone')}>
                        <label htmlFor="phone">Phone</label>
                        <input type="phone" id="phone" value={phone} onChange={(e) => SetPhone(e.target.value)} />
                    </div>
                    <div className={cx('shipping__billing__mail')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => SetEmail(e.target.value)} />
                    </div>
                </div>
            </form>
            <Button large className={cx('shipping__btn')} onClick={shippingSubmit}>
                Place order
            </Button>
            <ToastContainer />
        </div>
    );
}

export default Shipping;
