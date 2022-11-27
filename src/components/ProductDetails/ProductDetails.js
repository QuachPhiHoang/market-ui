// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ProductDetails.scss';

import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import ProductView from './ProductView';
import { getProductDetail } from '~/redux/product-modal/productDetailSlice';

const cx = classNames.bind(styles);

function ProductDetails() {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.productDetailSlice);
    const [content, setContent] = useState();

    const { id } = useParams();
    useEffect(() => {
        if (id && status === 'idle') {
            dispatch(getProductDetail(id));
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
    }, [dispatch, status, error, products, id, content]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [content]);

    return content ? (
        <div className="product__list">
            <ProductView products={content ? content : {}} />

            <div className={cx('product__description')}>
                <div className={cx('product__description__title')}>
                    <Button outline className={cx('product__description__title__btn')}>
                        Description
                    </Button>
                    <Button outline className={cx('product__description__title__btn')}>
                        Review({content.numOfReviews})
                    </Button>
                </div>
                <div className={cx('product__description__content')}>
                    <p className={cx('product__description__content__description')}>
                        A key objective is engaging digital marketing customers and allowing them to interact with the
                        brand through servicing and delivery of digital media. Information is easy to access at a fast
                        rate through the use of digital communications.
                    </p>
                    <p className={cx('product__description__content__description')}>
                        Users with access to the Internet can use many digital mediums, such as Facebook, YouTube,
                        Forums, and Email etc. Through Digital communications it creates a Multi-communication channel
                        where information can be quickly exchanged around the world by anyone without any regard to whom
                        they are.[28] Social segregation plays no part through social mediums due to lack of face to
                        face communication and information being wide spread instead to a selective audience.
                    </p>
                </div>
            </div>
        </div>
    ) : null;
}

export default ProductDetails;
