import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Sell.scss';

const cx = classNames.bind(styles);
function SellProduct({ data }) {
    return (
        <div className={cx('sell__item')}>
            <div className={cx('sell__item-image')}>
                <img srcSet={`${data.img} 2x`} alt="img" />
            </div>
            <p className={cx('sell__item-title')}>{data.title}</p>
            <p className={cx('sell__item-price')}>{`$${data.price}.00`}</p>
        </div>
    );
}

SellProduct.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SellProduct;
