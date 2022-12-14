import ReactStars from 'react-rating-stars-component';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withRouter from '~/hooks/withRouter';

import { addItem } from '~/redux/shopping/shopping';

import images from '~/assets/images';
import icons from '~/assets/icons';

import classNames from 'classnames/bind';
import styles from './ProductDetails.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ProductView({ product }) {
    const dispatch = useDispatch();

    const options = {
        count: 5,
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: '#E6E650',
        value: product.ratings ? product.ratings : 0,
        isHalf: true,
    };

    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    // const [previewImg, setPreviewImg] = useState(products.img);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    const check = () => {
        if (color === undefined) {
            alert('Please select a color');
            return false;
        }

        if (size === undefined) {
            alert('Please select a size');
            return false;
        }
        return true;
    };

    // const addToCart = () => {
    //     if (check()) {
    //         dispatch(addItem({ products }));
    //     }
    // };

    // const goToCart = () => {
    //     if (check()) {
    //         dispatch(addItem({ products }));
    //         navigate('/cart');
    //     }
    // };

    return (
        <div className={cx('product__details')}>
            <div className={cx('product__details__picture')}>
                <div className={cx(`product__details__sale ${Number(product.sale) === 0 ? '' : 'active'}`)}>
                    <p className={cx('product__details__sale__info')}>{product.sale}%</p>
                </div>
                <div className={cx('product__details__images__main')}>
                    <img src={product.img} alt="productDetails" />
                </div>
                <div className={cx('product__details__list')}>
                    <div className={cx('product__details__list__images')}>
                        <img
                            className={cx('product__details__images')}
                            srcSet={`${images.img_productDetails_section} 2x`}
                            alt="productDetails-Section"
                        />
                    </div>
                    <div className={cx('product__details__list__images')}>
                        <img
                            className={cx('product__details__images')}
                            srcSet={`${images.img_productDetails_section} 2x`}
                            alt="productDetails-Section"
                        />
                    </div>
                    <div className={cx('product__details__list__images')}>
                        <img
                            className={cx('product__details__images')}
                            srcSet={`${images.img_productDetails_section} 2x`}
                            alt="productDetails-Section"
                        />
                    </div>
                    <div className={cx('product__details__list__images')}>
                        <img
                            className={cx('product__details__images')}
                            srcSet={`${images.img_productDetails_section} 2x`}
                            alt="productDetails-Section"
                        />
                    </div>
                </div>
            </div>
            <div className={cx('product__details__description')}>
                <div className={cx('product__details__description__path')}>
                    <p className={cx('product__details__description__path__title')}>
                        home / shop / {product.gender === 'male' ? 'Man' : 'Woman'} /<strong>{product.name}</strong>
                    </p>
                </div>
                <div className={cx('product__details__description__title')}>{product.name}</div>
                <div className={cx('product__details__vote')}>
                    <ReactStars {...options} />
                    <p className={cx('product__details__vote__quantity')}>{`(${product.numOfReviews})`}</p>
                </div>
                <div className={cx('product__details__price')}>
                    <del className={cx('product__details__price__old')}>{`$${product.oldPrice}.00`}</del>
                    <p className={cx('product__details__price__cur')}>{`$${product.price}.00`}</p>
                </div>
                <div className={cx('product__details__description__description')}>{product.desc}</div>
                <div className={cx('product__details__color')}>
                    <label className={cx('product__details__color__title')}>Select Colors:</label>
                    {product.colors &&
                        product.colors.map((item, index) => (
                            <div
                                key={index}
                                className={cx(`product__details__color__list ${color === item ? 'active' : ''}`)}
                                onClick={() => setColor(item)}
                            >
                                <div className={cx(`product__details__color__circle bg-${item}`)}></div>
                            </div>
                        ))}
                </div>
                <div className={cx('product__details__size')}>
                    <div className={cx('product__details__size__dropdown')} onClick={() => setIsActive(!isActive)}>
                        <p className={cx('product__details__size__dropdown__select')}>
                            {size === undefined ? 'Select Size' : size}
                        </p>
                        <img src={icons.arrow} alt="arrow" />
                    </div>
                    {isActive && (
                        <div className={cx('product__details__size__dropdown__list')}>
                            {product.size.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx('product__details__size__dropdown__item')}
                                    onClick={() => {
                                        setSize(item);
                                        setIsActive(false);
                                    }}
                                >
                                    <p className={cx('product__details__size__dropdown__item__size')}>{item}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={cx('product__details__quantity')}>
                    <label className={cx('product__details__quantity__title')}>Quantity:</label>
                    <div className={cx('product__details__quantity__btn')}>
                        <div
                            className={cx('product__details__quantity__btn__minus')}
                            onClick={() => updateQuantity('minus')}
                        >
                            -
                        </div>
                    </div>
                    <div className={cx('product__details__quantity__input')}>{quantity}</div>
                    <div className={cx('product__details__quantity__btn')}>
                        <div
                            className={cx('product__details__quantity__btn__plus')}
                            onClick={() => updateQuantity('plus')}
                        >
                            +
                        </div>
                    </div>
                </div>

                <div className={cx('product__details__stock')}>
                    <label className={cx('product__details__stock__title')}>Status:</label>
                    <p className={cx(`product__details__stock__info bg-${product.stock < 1 ? 'red' : 'green'}`)}>
                        {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                    </p>
                </div>

                <div className={cx('product__details__btn')}>
                    <Button primary className={cx('product__details__btn__add')}>
                        {/* onClick={() => addToCart()} */}
                        ADD TO CART
                    </Button>
                    <Button primary className={cx('product__details__btn__buy')}>
                        {/* onClick={() => goToCart()} */}
                        BUY NOW
                    </Button>
                </div>
                <div className={cx('product__details__info')}>
                    <p>
                        <strong>Category:</strong>Women, Polo, Casual
                    </p>
                    <p>
                        <strong>Tags:</strong>Modern, Design, cotton
                    </p>
                </div>
                <div className={cx('product__details__socials')}>
                    <div className={cx('product__details__socials__item')}>
                        <p className={cx('product__details__socials__item__facebook')}>f</p>
                    </div>
                    <div className={cx('product__details__socials__item')}>
                        <p className={cx('product__details__socials__item__twitter')}>t</p>
                    </div>
                    <div className={cx('product__details__socials__item')}>
                        <p className={cx('product__details__socials__item__google')}>g</p>
                    </div>
                    <div className={cx('product__details__socials__item')}>
                        <p className={cx('product__details__socials__item__linkedin')}>In</p>
                    </div>
                    <div className={cx('product__details__socials__item')}>
                        <img className={cx('product__details__socials__item__email')} src={icons.email} alt="email" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(ProductView);
