import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UpdateProfile.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';
import Button from '~/components/Button';
import { updateProfile, loadUser } from '~/redux/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateProfile() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarReview, setAvatarReview] = useState(images.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isUpdate } = useSelector((state) => state.user);
    console.log(isUpdate);

    const UpdateProfile = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('username', username);
        myForm.set('email', email);
        myForm.set('avatar', avatar);

        dispatch(updateProfile(myForm));
    };

    const updateData = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarReview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setUserName(user?.user?.username);
            setEmail(user?.user?.email);
            setAvatarReview(user?.user?.avatar?.url);
        }
        if (isUpdate) {
            dispatch(loadUser());
            navigate('/account');
        }
    }, [isUpdate, dispatch, navigate, user]);

    return (
        <div className={cx('update')}>
            <div className={cx('update__img')}>
                <img src={images.page_login} alt="login-page" />
            </div>
            <form className={cx('update__form')}>
                <div className={cx('update__form__horizontal-gap')}>
                    <div className={cx('update__form__horizontal-gap__line')}></div>
                    <div className={cx('update__form__horizontal-gap__line')}></div>
                </div>
                <input
                    className={cx('update__form__user')}
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    className={cx('update__form__email')}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className={cx('update__form__image')}>
                    <img src={avatarReview} alt="Avatar Preview" />
                    <input type="file" name="avatar" accept="image/*" onChange={updateData} />
                </div>
                <Button primary className={cx('update__form__update-btn')} onClick={UpdateProfile}>
                    Update Profile
                </Button>
            </form>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default UpdateProfile;
