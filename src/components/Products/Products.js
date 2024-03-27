import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '~/redux/product-modal/productsSlice';
import classNames from 'classnames/bind';
import styles from './Products.scss';
import ProductItem from './ProductItem';
const cx = classNames.bind(styles);

function Products({ label, description }) {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
        // if (status === 'loading') {
        //     content.innerHTML = `${(<p>loading...</p>)}`;
        // } else
        // else if (status === 'failed') {
        //     content.innerHTML = `${(<p>{error}</p>)}`;
        // }
    }, [dispatch]);
    return (
        <div className={cx('product')}>
            <p className={cx('product__title')}>{label}</p>
            <p className={cx('product__description')}>{description}</p>
            <div className={cx('product__list')}>
                {products && products.map((item) => <ProductItem key={item._id} data={item} />)}
            </div>
        </div>
    );
}

Products.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Products;
