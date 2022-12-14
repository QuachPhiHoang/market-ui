import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Header.scss';
import icons from '~/assets/icons';
import Search from '~/components/Search';

const itemNav = [
    { title: 'home', path: '/' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
    { title: 'catalog', path: '/category' },
];

const cx = classNames.bind(styles);

function Header() {
    const cartItems = useSelector((state) => state.cartItems.value);
    const [totalProducts, setTotalProducts] = useState(0);

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
                    <Link to={'/login'}>
                        <img className={cx('header__navbar-icon-user')} src={icons.user} alt="user" />
                    </Link>
                    <Link to={'/cart'} className={cx('header__navbar-icon-cart')}>
                        <img src={icons.cart} alt="cart" />
                        {totalProducts ? <p className={cx('header__navbar-icon-cart--info')}>{totalProducts}</p> : null}
                    </Link>
                    <img className={cx('header__navbar-icon-menu')} src={icons.menu} alt="menu" />
                </div>
            </div>
        </div>
    );
}

export default Header;
