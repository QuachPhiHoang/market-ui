import classNames from 'classnames/bind';
import styles from './Promo.scss';
import promoData from '~/fakePromoData';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Promo() {
    return (
        <div className={cx('promo')}>
            {promoData.map((item) => (
                <div className={cx('promo-item')} key={item.id + 1}>
                    <div className={cx('promo-item__img')}>
                        <img srcSet={`${item.img} 2x`} alt="img1" />
                    </div>
                    <p className={cx('promo-item__title')}>{item.title}</p>
                    <p className={cx('promo-item__description')}>{item.description}</p>
                    <Button small className={cx('promo__btn')}>
                        BUY NOW
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default Promo;
