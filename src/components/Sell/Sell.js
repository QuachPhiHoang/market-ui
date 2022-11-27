import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Sell.scss';
import SaleProduct from '~/fakeSaleData';
import SellProduct from './SellProduct';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function Sell({ label, description }) {
    return (
        <div className={cx('sell')}>
            <p className={cx('sell__title')}>{label}</p>
            <p className={cx('sell__description')}>{description}</p>
            <div className={cx('sell__list')}>
                {SaleProduct.map((item) => (
                    <SellProduct key={item.id} data={item} />
                ))}
            </div>
            <Button primary className={cx('sell__btn')}>
                SHOP NOW
            </Button>
        </div>
    );
}

Sell.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Sell;
