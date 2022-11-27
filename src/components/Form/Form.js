import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Form.scss';

const cx = classNames.bind(styles);
function Form() {
    return (
        <div className={cx('form')}>
            <div>
                <p className={cx('form__title')}>We would love to hear from you.</p>
                <p className={cx('form__description')}>
                    If you have any query or any type of suggestion, you can contact us here. We would love to hear from
                    you.
                </p>
                <div className={cx('form__input')}>
                    <div className={cx('form__input-contact')}>
                        <div className={cx('form__name')}>
                            <label htmlFor="form__name">Name</label>
                            <input id="form__name" type="text" name="Name" />
                        </div>
                        <div className={cx('form__email')}>
                            <label htmlFor="form__email">Email</label>
                            <input type="email" id="form__email" />
                        </div>
                    </div>
                    <div className={cx('form__message')}>
                        <label htmlFor="form__message">Message</label>
                        <textarea id="form__message" name="Message"></textarea>
                    </div>
                    <Button primary className={cx('form--submit')}>
                        SEND MESSAGE
                    </Button>
                </div>
            </div>
            <div className="form__info">
                <div className="form__info-item">
                    <p className="form__info-title">Visit Us</p>
                    <p className="form__info-contact">UET Lahore, Punjab, Pakistan</p>
                    <p className="form__info-contact">Phone: +923039898987</p>
                </div>
                <div className="form__info-item">
                    <p className="form__info-title">Get In Touch</p>
                    <p className="form__info-contact">You can get in touch with us on this provided email.</p>
                    <p className="form__info-contact">Email: hmjawad087@gmail.com</p>
                </div>
            </div>
        </div>
    );
}

export default Form;
