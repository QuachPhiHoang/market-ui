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
    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const productId = useSelector((state) => state.productDetailSlice.productId);
    const { products, status, error } = useSelector((state) => state.productDetailSlice);

    useEffect(() => {
        if (productId && status === 'idle') {
            dispatch(getProductDetail(productId));
        }
        if (status === 'succeeded') {
            setContent(products);
        }
    }, [productId, dispatch, products, content, status]);

    return content ? (
        <div className={cx(`product-view__modal ${productId === null ? '' : 'active'}`)}>
            <div className={cx(`product-view__modal__content ${productId === null ? '' : 'active'}`)}>
                <ProductView products={content ? content : {}} />
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
