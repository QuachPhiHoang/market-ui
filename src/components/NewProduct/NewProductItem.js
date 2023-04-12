import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NewProduct.scss';
import { set } from '~/redux/product-modal/productDetailSlice';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function NewProductItem({ data }) {
    const dispatch = useDispatch();
    return (
        <div>
            <Link to={`/categories/${data._id}`}>
                <div className={cx('new-product__item')}>
                    <div className={cx('new-product__item-image')}>
                        <img srcSet={`${data.img[0].url} 2x`} alt="item" />
                    </div>
                    <p className={cx('new-product__item-title')}>{data.name}</p>
                    <p className={cx('new-product__item-price')}>{`$${data.price}.00`}</p>
                </div>
            </Link>
            <Button primary small className={cx('new-product__item__btn')} onClick={() => dispatch(set(data._id))}>
                <p>BUY NOW</p>
            </Button>
        </div>
    );
}

NewProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default NewProductItem;
