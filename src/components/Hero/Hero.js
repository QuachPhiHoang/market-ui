import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Hero.scss';

const cx = classNames.bind(styles);

function Hero() {
    return (
        <div className={cx('hero')}>
            <div className={cx('hero__image')}>
                <img srcSet={`${images.hero} 2x`} alt="hero" />
            </div>
            <div className={cx('hero__title')}>stylist picks beat the heat</div>
            <Button outline className={cx('hero__btn')}>
                Shop Now
            </Button>
        </div>
    );
}

export default Hero;
