import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './ProductDetails.scss';
import { remove } from '~/redux/product-modal/productDetailSlice';

import ProductView from './ProductView';
import Button from '~/components/Button';
import { getProductDetail } from '~/redux/product-modal/productDetailSlice';

const cx = classNames.bind(style);

function ProductViewModal() {
    const dispatch = useDispatch();
    // const productId = useSelector((state) => state.productDetailSlice.productId);
    const { productId, product, status, error } = useSelector((state) => state.productDetailSlice);

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetail(productId));
        }
    }, [productId, dispatch]);

    return product ? (
        <div className={cx(`product-view__modal ${productId === null ? '' : 'active'}`)}>
            <div className={cx(`product-view__modal__content ${productId === null ? '' : 'active'}`)}>
                <ProductView product={product.product ? product.product : {}} />
                <Button
                    small
                    outline
                    className={cx('product-view__modal__content__btn')}
                    onClick={() => dispatch(remove())}
                >
                    X
                </Button>
            </div>
        </div>
    ) : null;
}

export default ProductViewModal;
