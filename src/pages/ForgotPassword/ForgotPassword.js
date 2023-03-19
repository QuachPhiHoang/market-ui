import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';
import { forgotPassword } from '~/redux/forgot-pasword/forgot-pasword';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('email', email);

        dispatch(forgotPassword(myForm));
    };

    return (
        <div className={cx('forgot-password')}>
            <div className={cx('forgot-password__img')}>
                <img src={images.page_login} alt="login-page" />
            </div>
            <form className={cx('forgot-password__form')}>
                <Link className={cx('forgot-password__form__brand')} to={'/'}>
                    <img src={icons.logo} alt="brand" />
                </Link>

                <div className={cx('forgot-password__form__horizontal-gap')}>
                    <div className={cx('forgot-password__form__horizontal-gap__line')}></div>
                    <div className={cx('forgot-password__form__horizontal-gap__line')}></div>
                </div>

                <input
                    className={cx('forgot-password__form__email')}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                    primary
                    className={cx('forgot-password__form__forgot-password-btn')}
                    onClick={forgotPasswordSubmit}
                >
                    Get Password
                </Button>
            </form>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default ForgotPassword;
