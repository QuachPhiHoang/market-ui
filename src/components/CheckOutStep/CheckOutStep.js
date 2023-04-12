import React from 'react';
import icons from '~/assets/icons';
import classNames from 'classnames/bind';
import styles from './CheckOutStep.scss';

function CheckoutSteps({ activeStep }) {
    const steps = [
        {
            label: 'Shipping Details',
            icon: icons.shipping,
            active: icons.shipping_active,
        },
        {
            label: 'Confirm Order',
            icon: icons.orderConfirm,
            active: icons.orderConfirm_active,
        },
        {
            label: 'Payment',
            icon: icons.payment,
            active: icons.payment_active,
        },
    ];
    const cx = classNames.bind(styles);

    return (
        <div className={cx('checkout__step')}>
            {steps.map((item, index) => (
                <div className={cx(`checkout__step__label ${index === activeStep ? 'active' : ''} `)} key={index}>
                    <img className={cx(`checkout__step__icon`)} src={item.icon} alt={item.icon} />
                    <img className={cx(`checkout__step__icon--active `)} src={item.active} alt={item.label} />
                    <p>{item.label}</p>
                </div>
            ))}
        </div>
    );
}

export default CheckoutSteps;
