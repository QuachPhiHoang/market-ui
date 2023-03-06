import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { logOut } from '~/redux/user/userSlice';

import classNames from 'classnames/bind';
import styles from './Header.scss';
import icons from '~/assets/icons';
import Search from '~/components/Search';
import Button from '~/components/Button';
import Menu from '~/components/Menu';

const itemNav = [
    { title: 'home', path: '/' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
    { title: 'catalog', path: '/category' },
];

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const cartItems = useSelector((state) => state.cartItems.value);
    const [totalProducts, setTotalProducts] = useState(0);
    // console.log(user.user._id);
    const menu = [
        {
            title: 'View Profile',
            icon: icons.user,
            to: '/account',
        },
        {
            title: 'Log Out',
            icon: icons.logOut,
            func: () => {
                dispatch(logOut());
            },
        },
    ];

    useEffect(() => {
        setTotalProducts(cartItems.reduce((arr, cur) => arr + cur.quantity, 0));
    }, [cartItems]);

    return (
        <div className={cx('header')}>
            <div className={cx('header__topbar')}>
                <div className={cx('header__topbar-title')}>Free Shipping & Returns On All US Orders</div>
                <div className={cx('header__topbar-nav')}>
                    <p className={cx('header__topbar-nav-menu')}>Support</p>
                    <p className={cx('header__topbar-nav-menu')}>Blog</p>
                    <p className={cx('header__topbar-nav-menu')}>Languages</p>
                    <img className={cx('header__topbar-nav-arrow')} src={icons.arrow} alt="arrow" />
                </div>
            </div>
            <div className={cx('header__navbar')}>
                <div className={cx('header__navbar-logo')}>
                    <NavLink className={cx('header__navbar-logo-image')} to="/">
                        <img src={icons.logo} alt="logo" />
                    </NavLink>
                </div>
                <div className={cx('header__navbar-menu')}>
                    {itemNav.map((item, index) => {
                        return (
                            <div className={cx('header__navbar-item')} key={index}>
                                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={item.path}>
                                    {item.title}
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('header__navbar-icon')}>
                    <Search />
                    {isLoggedIn ? (
                        <Link to={'/cart'} className={cx('header__navbar-icon-cart')}>
                            <img src={icons.cart} alt="cart" />
                            {totalProducts ? (
                                <p className={cx('header__navbar-icon-cart--info')}>{totalProducts}</p>
                            ) : null}
                        </Link>
                    ) : (
                        <Link to={'/login'} className={cx('header__navbar-icon-cart')}>
                            <img src={icons.cart} alt="cart" />
                        </Link>
                    )}
                    {isLoggedIn ? (
                        <img className={cx('header__navbar-icon-has-user')} src={user?.user?.avatar?.url} alt="user" />
                    ) : (
                        <Link to={'/login'}>
                            <Button primary small className={cx('header__navbar-icon-login')}>
                                Login
                            </Button>
                        </Link>
                    )}
                    {isLoggedIn ? <Menu children={menu} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Header;
