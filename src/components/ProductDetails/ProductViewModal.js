import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './ProductDetails.scss';
import { getProductDetail, remove } from '~/redux/product-modal/productDetailSlice';

import ProductView from './ProductView';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function ProductViewModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId, product } = useSelector((state) => state.productDetailSlice);

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetail(productId));
        }
    }, [productId, dispatch]);

    const onClose = () => {
        dispatch(remove());
        navigate('/');
    };

    return product ? (
        <div className={cx(`product-view__modal ${productId === null ? '' : 'active'}`)}>
            <div className={cx(`product-view__modal__content ${productId === null ? '' : 'active'}`)}>
                <ProductView product={product ? product : {}} />
                <Button small outline className={cx('product-view__modal__content__btn')} onClick={onClose}>
                    X
                </Button>
            </div>
        </div>
    ) : null;
}

export default ProductViewModal;
