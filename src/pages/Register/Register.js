import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Register.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';
import { register } from '~/redux/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Register() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [avatar, setAvatar] = useState(images.profile);
    const [avatarReview, setAvatarReview] = useState(images.profile);
    const [valuePassword, setValuePassword] = useState({
        showPassword: false,
    });
    const { isLoggedIn } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const { username, password, email, confirmPassword } = user;

    const handleShowPassword = () => {
        setValuePassword({ showPassword: !valuePassword.showPassword });
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('username', username);
        myForm.set('password', password);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        if (password !== confirmPassword) {
            toast.error('Confirm Password Is Not Match', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        } else {
            dispatch(register(myForm));
        }
    };

    const registerData = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarReview(reader.result);
                    setAvatar(reader.result);
                }
            };
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    return (
        <div className={cx('register')}>
            <div className={cx('register__img')}>
                <img src={images.page_login} alt="login-page" />
            </div>
            <form className={cx('register__form')}>
                <div className={cx('register__form__brand')}>
                    <img src={icons.logo} alt="brand" />
                </div>
                <div className={cx('register__form__intro')}>Wellcome To, Rendelle</div>
                <div className={cx('register__form__des')}>Wellcome To! Please Register</div>

                <div className={cx('register__form__horizontal-gap')}>
                    <div className={cx('register__form__horizontal-gap__line')}></div>
                    <div className={cx('register__form__horizontal-gap__line')}></div>
                </div>
                <input
                    className={cx('register__form__user')}
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={registerData}
                />
                <input
                    className={cx('register__form__email')}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={registerData}
                />
                <div className={cx('register__form__password')}>
                    <input
                        className={cx('register__form__password__input')}
                        type={valuePassword.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        onChange={registerData}
                    />
                    <img
                        src={icons.showPassword}
                        alt={'show password'}
                        className={cx('register__form__password__icon')}
                        onClick={handleShowPassword}
                    />
                </div>
                <div className={cx('register__form__confirm-password')}>
                    <input
                        className={cx('register__form__confirm-password__input')}
                        type={valuePassword.showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={registerData}
                    />
                    <img
                        src={icons.showPassword}
                        alt={'show password'}
                        className={cx('register__form__confirm-password__icon')}
                        onClick={handleShowPassword}
                    />
                </div>
                <div className={cx('register__form__image')}>
                    <img src={avatarReview} alt="Avatar Preview" />
                    <input type="file" name="avatar" accept="image/*" onChange={registerData} />
                </div>
                <Button primary className={cx('register__form__register-btn')} onClick={registerSubmit}>
                    Register Accounts
                </Button>
            </form>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default Register;
