import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '~/redux/forgot-pasword/forgot-pasword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './ResetPasswordPage.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function ResetPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valuePassword, setValuePassword] = useState({
        showPassword: false,
    });
    const { success } = useSelector((state) => state.forgotPassword);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('password', password);
        myForm.set('confirmPassword', confirmPassword);

        dispatch(resetPassword({ token: token, password: myForm }));
    };

    useEffect(() => {
        if (success) {
            navigate('/login');
        }
    }, [success, dispatch, navigate]);

    const handleShowPassword = () => {
        setValuePassword({ showPassword: !valuePassword.showPassword });
    };

    return (
        <div className={cx('reset-password')}>
            <div className={cx('reset-password__img')}>
                <img src={images.page_login} alt="reset-password-page" />
            </div>
            <div className={cx('reset-password__box')}>
                <form className={cx('reset-password__form')}>
                    <div className={cx('reset-password__form__intro')}>Reset Password</div>
                    <div className={cx('reset-password__form__horizontal-gap')}>
                        <div className={cx('reset-password__form__horizontal-gap__line')}></div>
                        <p>or</p>
                        <div className={cx('reset-password__form__horizontal-gap__line')}></div>
                    </div>
                    <div className={cx('reset-password__form__password')}>
                        <input
                            className={cx('reset-password__form__password__input')}
                            type={valuePassword.showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                            src={icons.showPassword}
                            alt={'show password'}
                            className={cx('reset-password__form__show-password__icon')}
                            onClick={handleShowPassword}
                        />
                    </div>
                    <div className={cx('reset-password__form__password')}>
                        <input
                            className={cx('reset-password__form__password__input')}
                            type={valuePassword.showPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <img
                            src={icons.showPassword}
                            alt={'show password'}
                            className={cx('reset-password__form__show-password__icon')}
                            onClick={handleShowPassword}
                        />
                    </div>
                    <Button
                        primary
                        className={cx('reset-password__form__reset-password')}
                        onClick={updatePasswordSubmit}
                    >
                        Get Password
                    </Button>
                </form>
            </div>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default ResetPasswordPage;
