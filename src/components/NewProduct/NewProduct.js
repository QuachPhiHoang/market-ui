import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '~/redux/product-modal/productsSlice';

import classNames from 'classnames/bind';
import styles from './NewProduct.scss';
import NewProductItem from './NewProductItem';
const cx = classNames.bind(styles);

function NewProduct({ label, description }) {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.product);
    const [content, setContent] = useState();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProducts());
        }
        // if (status === 'loading') {
        //     content.innerHTML = `${(<p>loading...</p>)}`;
        // } else
        if (status === 'succeeded') {
            setContent(products);
        }
        // else if (status === 'failed') {
        //     content.innerHTML = `${(<p>{error}</p>)}`;
        // }
    }, [dispatch, status, error, products, content]);

    return (
        <div className={cx('new-product')}>
            <p className={cx('new-product__title')}>{label}</p>
            <p className={cx('new-product__description')}>{description}</p>
            <div className={cx('new-product__list')}>
                {content && content.products.map((item) => <NewProductItem key={item._id} data={item} />)}
            </div>
        </div>
    );
}

NewProduct.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default NewProduct;
