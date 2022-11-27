import classNames from 'classnames/bind';
import styles from './Footer.scss';
import images from '~/assets/images';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-heading')}>
                <div className={cx('footer-heading__info')}>
                    <ul className={cx('footer-heading__info-title')}>Company info</ul>
                    <li className={cx('footer-heading__info-description')}>About Us</li>
                    <li className={cx('footer-heading__info-description')}>Latest Posts</li>
                    <li className={cx('footer-heading__info-description')}>Contact Us</li>
                    <li className={cx('footer-heading__info-description')}>Shop</li>
                </div>
                <div className={cx('footer-heading__helplink')}>
                    <ul className={cx('footer-heading__helplink-title')}>help links</ul>
                    <li className={cx('footer-heading__helplink-description')}>Tracking</li>
                    <li className={cx('footer-heading__helplink-description')}>Order Status</li>
                    <li className={cx('footer-heading__helplink-description')}>Delivery</li>
                    <li className={cx('footer-heading__helplink-description')}>Shipping Info</li>
                    <li className={cx('footer-heading__helplink-description')}>FAQ</li>
                </div>
                <div className={cx('footer-heading__usefullink')}>
                    <ul className={cx('footer-heading__usefullink-title')}>useful links</ul>
                    <li className={cx('footer-heading__usefullink-description')}>About Us</li>
                    <li className={cx('footer-heading__usefullink-description')}>Latest Posts</li>
                    <li className={cx('footer-heading__usefullink-description')}>Contact Us</li>
                    <li className={cx('footer-heading__usefullink-description')}>Shop</li>
                </div>
                <div className={cx('footer-heading__email')}>
                    <p className={cx('footer-heading__email-title')}>get in the know</p>
                    <input type="email" placeholder="Enter Email" />
                    <img src={icons.arrowRight} alt="arrow right" />
                </div>
            </div>
            <div className={cx('footer-bottom')}>
                <div className={cx('footer-bottom__policy')}>
                    <p className={cx('footer-bottom__policy-info')}>© 2020 NorthStar eCommerce</p>
                    <p className={cx('footer-bottom__policy-info')}>Privacy Policy Terms & Conditions</p>
                </div>
                <div className={cx('footer-bottom__payment')}>
                    <img srcSet={`${images.payment1} 2x`} alt="payment1" />
                    <img srcSet={`${images.payment2} 2x`} alt="payment2" />
                    <img srcSet={`${images.payment3} 2x`} alt="payment3" />
                    <img srcSet={`${images.payment4} 2x`} alt="payment4" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
