import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Products.scss';
import { set } from '~/redux/product-modal/productDetailSlice';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function ProductItem({ data }) {
    const dispatch = useDispatch();
    return (
        <div>
            <Link to={`/categories/${data?._id}`}>
                <div className={cx('product__item')}>
                    <div className={cx('product__item__image')}>
                        <img srcSet={`${data?.images[0]?.url} 2x`} alt="item" />
                    </div>
                    <p className={cx('product__item__title')}>{data?.name}</p>
                    <p className={cx('product__item__price')}>{`$${data?.price}.00`}</p>
                </div>
            </Link>
            <Button primary small className={cx('product__item__btn')} onClick={() => dispatch(set(data?._id))}>
                <p>BUY NOW</p>
            </Button>
        </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProductItem;
