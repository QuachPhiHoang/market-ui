import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, reset } from '~/redux/profile/profileSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './UpdatePassword.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [valuePassword, setValuePassword] = useState({
        showPassword: false,
    });
    const { isUpdate } = useSelector((state) => state.profile);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('oldPassword', oldPassword);
        myForm.set('newPassword', newPassword);
        myForm.set('confirmNewPassword', confirmNewPassword);

        dispatch(updatePassword({ password: myForm }));
    };

    useEffect(() => {
        if (isUpdate) {
            dispatch(reset());
            navigate('/account');
        }
    }, [isUpdate, dispatch, navigate]);

    const handleShowPassword = () => {
        setValuePassword({ showPassword: !valuePassword.showPassword });
    };

    return (
        <div className={cx('update-password')}>
            <div className={cx('update-password__img')}>
                <img src={images.page_login} alt="update-password-page" />
            </div>
            <div className={cx('update-password__box')}>
                <form className={cx('update-password__form')}>
                    <div className={cx('update-password__form__intro')}>Update Password</div>
                    <div className={cx('update-password__form__horizontal-gap')}>
                        <div className={cx('update-password__form__horizontal-gap__line')}></div>
                        <p>or</p>
                        <div className={cx('update-password__form__horizontal-gap__line')}></div>
                    </div>
                    <div className={cx('update-password__form__password')}>
                        <input
                            className={cx('update-password__form__password__input')}
                            type={valuePassword.showPassword ? 'text' : 'password'}
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <img
                            src={icons.showPassword}
                            alt={'show password'}
                            className={cx('update-password__form__show-password__icon')}
                            onClick={handleShowPassword}
                        />
                    </div>
                    <div className={cx('update-password__form__password')}>
                        <input
                            className={cx('update-password__form__password__input')}
                            type={valuePassword.showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <img
                            src={icons.showPassword}
                            alt={'show password'}
                            className={cx('update-password__form__show-password__icon')}
                            onClick={handleShowPassword}
                        />
                    </div>
                    <div className={cx('update-password__form__password')}>
                        <input
                            className={cx('update-password__form__password__input')}
                            type={valuePassword.showPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <img
                            src={icons.showPassword}
                            alt={'show password'}
                            className={cx('update-password__form__show-password__icon')}
                            onClick={handleShowPassword}
                        />
                    </div>
                    <Button
                        primary
                        className={cx('update-password__form__update-password')}
                        onClick={updatePasswordSubmit}
                    >
                        Change Password
                    </Button>
                </form>
            </div>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default UpdatePassword;
