import classNames from 'classnames/bind';
import styles from './Testtimonial.scss';
import dataTesttimonial from '~/fakeDataTesttimonial';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);
function Testtimonial() {
    return (
        <div className={cx('testtimonial')}>
            <p className={cx('testtimonial__title')}>Testimonials</p>
            <div className={cx('testtimonial__list')}>
                {dataTesttimonial.map((item) => (
                    <div className={cx('testtimonial__item')} key={item.id}>
                        <div className={cx('testtimonial__thumbnail')}>
                            <img srcSet={`${item.img} 2x`} alt={`item${item.id}`} />
                        </div>
                        <div className={cx('testtimonial__info')}>
                            <div className={cx('testtimonial__quotation-mark')}>
                                <img src={icons.quotation} alt="quotationMark" />
                                <p className={cx('testtimonial__info-title')}>{item.title}</p>
                                <p className={cx('testtimonial__info-name')}>{item.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testtimonial;
