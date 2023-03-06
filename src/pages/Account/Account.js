import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Account.scss';

const cx = classNames.bind(styles);

function Account() {
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.user);

    // console.log(user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    return (
        <div className={cx('profile')}>
            {/* <head>
                <meta charSet="utf-8" />
                <title>{`${user?.user?.username} profile`}</title>
            </head> */}
            <div className={cx('profile__container')}>
                <div className={cx('profile__sidebar')}>
                    <div className={cx('profile__sidebar__title')}>My Profile</div>
                    <img className={cx('profile__sidebar__avatar')} src={user?.user?.avatar?.url} alt={cx('avatar')} />
                    <Link className={cx('profile__sidebar__edit')} to={'/update/profile'}>
                        Edit Profile
                    </Link>
                </div>
                <div className={cx('profile__info')}>
                    <div className={cx('profile__info__name')}>
                        <h1>FullName:</h1>
                        <p>{user?.user?.username}</p>
                    </div>
                    <div className={cx('profile__info__email')}>
                        <h1>Email:</h1>
                        <p>{user?.user?.email}</p>
                    </div>
                    <div className={cx('profile__info__joinedon')}>
                        <h1>Joined On:</h1>
                        <p>{user?.user?.createdAt.substring(0, 10)}</p>
                    </div>
                    <div className={cx('profile__info__buy')}>
                        <Link className={cx('profile__info__myorder')} to={'/order'}>
                            My Orders
                        </Link>
                        <Link className={cx('profile__info__updatepassword')} to={'/password/update'}>
                            Change PassWord
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
