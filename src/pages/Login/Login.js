import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/redux/user/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './Login.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [valuePassword, setValuePassword] = useState({
        showPassword: false,
    });

    const handleShowPassword = () => {
        setValuePassword({ showPassword: !valuePassword.showPassword });
    };
    const { isLoggedIn } = useSelector((state) => state.user);

    const goToRegister = () => {
        navigate('/register');
    };

    const handleLoginGoogle = (e) => {
        e.preventDefault();
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username: loginUser, password: loginPassword }));
    };

    useEffect(() => {
        const handleNavigate = setTimeout(() => {
            if (isLoggedIn) {
                navigate('/');
            }
        }, 1000);

        return () => {
            clearTimeout(handleNavigate);
        };
    }, [isLoggedIn, navigate]);

    return (
        <div className={cx('login')}>
            <div className={cx('login__img')}>
                <img src={images.page_login} alt="login-page" />
            </div>
            <form className={cx('login__form')}>
                <div className={cx('login__form__brand')}>
                    <img src={icons.logo} alt="brand" />
                </div>
                <div className={cx('login__form__intro')}>Wellcome Back, Rendelle</div>
                <div className={cx('login__form__des')}>Wellcome back! Please enter your details</div>
                <Button outline className={cx('login__form__google')} onClick={handleLoginGoogle}>
                    <img src={images.logo} alt="google" />
                    <p className={cx('login__form__google__title')}>Login in with Google</p>
                </Button>
                <div className={cx('login__form__horizontal-gap')}>
                    <div className={cx('login__form__horizontal-gap__line')}></div>
                    <p>or</p>
                    <div className={cx('login__form__horizontal-gap__line')}></div>
                </div>
                <input
                    className={cx('login__form__user')}
                    type="text"
                    placeholder="Username"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                />
                <div className={cx('login__form__password')}>
                    <input
                        className={cx('login__form__password__input')}
                        type={valuePassword.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <img
                        src={icons.showPassword}
                        alt={'show password'}
                        className={cx('register__form__confirm-password__icon')}
                        onClick={handleShowPassword}
                    />
                </div>
                <div className={cx('login__form__checked')}>
                    <div className={cx('login__form__checked__remember')}>
                        <label>Remember for 30 days</label>
                    </div>
                    <div className={cx('login__form__checked__forgot')}>
                        <Button small text>
                            Forgot password
                        </Button>
                    </div>
                </div>
                <Button primary className={cx('login__form__login')} onClick={handleLoginSubmit}>
                    Log in
                </Button>
                <div className={cx('login__form__register')}>
                    <p>Don't have accounts</p>
                    <Button text onClick={goToRegister}>
                        Sign up for free
                    </Button>
                </div>
            </form>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default Login;
