// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ProductDetails.scss';

import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import ProductView from './ProductView';
import { getProductDetail } from '~/redux/product-modal/productDetailSlice';
import Reviews from '~/components/Reviews';

const cx = classNames.bind(styles);

function ProductDetails() {
    const [toggleState, setToggleState] = useState(1);
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.productDetailSlice);

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(getProductDetail(id));
        }
        // if (status === 'loading') {
        //     content.innerHTML = `${(<p>loading...</p>)}`;
        // } else

        // else if (status === 'failed') {
        //     content.innerHTML = `${(<p>{error}</p>)}`;
        // }
    }, [dispatch, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return product ? (
        <div className="product__list">
            <ProductView product={product} />

            <div className={cx('product__description')}>
                <div className={cx('product__description__title')}>
                    <Button
                        outline
                        className={cx(`product__description__title__btn ${toggleState === 1 ? 'active' : ''}`)}
                        onClick={() => setToggleState(1)}
                    >
                        Description
                    </Button>
                    <Button
                        outline
                        className={cx(`product__description__title__btn ${toggleState === 2 ? 'active' : ''}`)}
                        onClick={() => setToggleState(2)}
                    >
                        Review({product?.numOfReviews})
                    </Button>
                </div>
                <div className={cx('product__description__content')}>
                    <p
                        className={cx(
                            `product__description__content__description ${toggleState === 1 ? 'active' : ''}`,
                        )}
                    >
                        {product?.desc}
                    </p>
                    <div
                        className={cx(
                            `product__description__content__description ${toggleState === 2 ? 'active' : ''}`,
                        )}
                    >
                        {product?.reviews && product?.reviews[0] ? (
                            <div className={cx(`product__description__content__reviews`)}>
                                {product?.reviews &&
                                    product?.reviews.map((review) => <Reviews review={review} key={review?._id} />)}
                            </div>
                        ) : (
                            <p className={cx(`product__description__content__no-reviews`)}>No Reviews</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default ProductDetails;
