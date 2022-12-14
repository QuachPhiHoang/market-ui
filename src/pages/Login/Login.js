import classNames from 'classnames/bind';
import styles from './Login.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('login')}>
            <div className={cx('login__img')}>
                <img src={images.page_login} alt="login-page" />
            </div>
            <form className={cx('login__form')}>
                <div className={cx('login__form__brand')}>Logo</div>
                <div className={cx('login__form__intro')}>Wellcome Back, Brand</div>
                <div className={cx('login__form__des')}>Wellcome back! Please enter your details</div>
                <div className={cx('login__form__google')}>
                    <Button primary>
                        <img src={images.payment4} alt="google" />
                        <p className={cx('login__form__google__title')}>Login with Google</p>
                    </Button>
                </div>
                <input type="text" placeholder="please enter username" />
                <input type="password" placeholder="please enter password" />
                <div className={cx('login__form__checked')}>
                    <div className={cx('login__form__checked__remember')}>
                        <input type="checkbox" />
                        <label>Remember for 30 days</label>
                    </div>
                    <div className={cx('login__form__checked__forgot')}>
                        <Button small text>
                            forgot password
                        </Button>
                    </div>
                </div>
                <Button primary>Log in</Button>
                <div className={cx('login__form__register')}>
                    <p>Don't have accounts</p>
                    <Button text>Sign up for free</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
