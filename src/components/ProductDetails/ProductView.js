import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import withRouter from '~/hooks/withRouter';

import { addItemsToCart } from '~/redux/cart/cartSlice';

// import images from '~/assets/images';
import icons from '~/assets/icons';

import classNames from 'classnames/bind';
import styles from './ProductDetails.scss';
import Button from '~/components/Button';
import { Rating } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ProductView({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = {
        size: 'large',
        value: product?.ratings ? product?.ratings : 0,
        readOnly: true,
        precision: 0.5,
    };

    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [stock, setStock] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);

    const queryStockColorAndSize = () => {
        if (product?.variants && product?.variants.length) {
            const colorStockAndSize = product?.variants.reduce((acc, variant) => {
                const { color, size, stock } = variant;
                if (!acc[color.name]) {
                    acc[color.name] = [];
                }
                // Kiểm tra xem size đã tồn tại trong mảng chưa, nếu chưa thì thêm vào

                if (!acc[color.name].some((item) => item.size === size.name)) {
                    acc[color.name].push({ size: size.name, stock });
                }
                return acc;
            }, {});
            return colorStockAndSize;
        }
    };

    const stockByColorAndSize = queryStockColorAndSize();

    const selectedColorStocks = selectedColor && stockByColorAndSize ? stockByColorAndSize[selectedColor] : [];
    const handleColorSelect = (selectedColor) => {
        setSelectedColor(selectedColor);
        setColor(selectedColor);
        setSize(undefined); // Set size to undefined when selecting a new color
        setQuantity(1);
    };
    const handleSize = (item) => {
        setSize(item);
        const variant = selectedColorStocks.find((variant) => variant.size === item);
        setStock(variant.stock);
    };

    const increaseQuantity = () => {
        if (stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const check = () => {
        if (color === undefined) {
            toast.warning('Please select a color');
            return false;
        }

        if (size === undefined) {
            toast.warning('Please select a size');
            return false;
        }
        return true;
    };

    const addToCart = () => {
        if (check()) {
            dispatch(addItemsToCart({ id: product._id, quantity, color, size }));
            toast.success('Add To Cart Success');
        }
    };

    const goToCart = () => {
        if (check()) {
            dispatch(addItemsToCart({ id: product._id, quantity, color, size }));
            navigate('/cart');
        }
    };

    return (
        <div className={cx('product__details')}>
            <div className={cx('product__details__picture')}>
                <div className={cx(`product__details__sale ${Number(product.sale) === 0 ? '' : 'active'}`)}>
                    <p className={cx('product__details__sale__info')}>{product.sale}%</p>
                </div>
                <Carousel autoPlay interval={3000} className={cx('product__details__images__main')}>
                    {product.images &&
                        product?.images.map((item, index) => (
                            <div key={item._id}>
                                <img src={item.url} alt={`${item[index]}`} />
                            </div>
                        ))}
                </Carousel>
            </div>
            <div className={cx('product__details__description')}>
                <div className={cx('product__details__description__path')}>
                    <p className={cx('product__details__description__path__title')}>
                        home / shop / {product.gender === 'male' ? 'Man' : 'Woman'} /<strong>{product.name}</strong>
                    </p>
                </div>
                <div className={cx('product__details__description__title')}>{product.name}</div>
                <div className={cx('product__details__vote')}>
                    <Rating {...options} />
                    <p className={cx('product__details__vote__quantity')}>{`(${product.numOfReviews})`}</p>
                </div>
                <div className={cx('product__details__price')}>
                    <p className={cx('product__details__price__cur')}>{`$${product.price}.00`}</p>
                    {product.newPrice !== 0 ? (
                        <del className={cx('product__details__price__old')}>{`$${product.newPrice}.00`}</del>
                    ) : null}
                </div>
                <div className={cx('product__details__description__description')}>{`Description: ${product.desc}`}</div>
                {product?.variants?.length ? (
                    <>
                        <div className={cx('product__details__color')}>
                            <label className={cx('product__details__color__title')}>Select Colors:</label>
                            {Object.keys(stockByColorAndSize).map((item, index) => (
                                <div
                                    key={index}
                                    className={cx(
                                        `product__details__color__list ${selectedColor === item ? 'active' : ''}`,
                                    )}
                                    onClick={() => handleColorSelect(item)}
                                >
                                    <div className={cx(`product__details__color__circle bg-${item}`)}></div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('product__details__size')}>
                            <div
                                className={cx('product__details__size__dropdown')}
                                onClick={() => setIsActive(!isActive)}
                            >
                                <p className={cx('product__details__size__dropdown__select')}>
                                    {size === undefined ? 'Select Size' : size}
                                </p>
                                <img src={icons.arrow} alt="arrow" />
                            </div>
                            {isActive && (
                                <div className={cx('product__details__size__dropdown__list')}>
                                    {selectedColorStocks.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cx('product__details__size__dropdown__item')}
                                            onClick={() => {
                                                handleSize(item.size);
                                                setIsActive(false);
                                            }}
                                        >
                                            <p className={cx('product__details__size__dropdown__item__size')}>
                                                {item.size}
                                            </p>
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
                                    onClick={() => decreaseQuantity()}
                                >
                                    -
                                </div>
                            </div>
                            <div className={cx('product__details__quantity__input')}>{quantity}</div>
                            <div className={cx('product__details__quantity__btn')}>
                                <div
                                    className={cx('product__details__quantity__btn__plus')}
                                    onClick={() => increaseQuantity()}
                                >
                                    +
                                </div>
                            </div>
                        </div>

                        <div className={cx('product__details__stock')}>
                            <label className={cx('product__details__stock__title')}>Status:</label>
                            {stock !== null ? (
                                <p className={cx(`product__details__stock__info bg-${stock < 1 ? 'Red' : 'Green'}`)}>
                                    {stock < 1 ? 'OutOfStock' : 'InStock'}
                                </p>
                            ) : null}
                        </div>
                        <div className={cx('product__details__btn')}>
                            <Button primary className={cx('product__details__btn__add')} onClick={() => addToCart()}>
                                ADD TO CART
                            </Button>
                            <Button primary className={cx('product__details__btn__buy')} onClick={() => goToCart()}>
                                BUY NOW
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className={cx('product__details__coming')}>Coming Soon...</p>
                )}

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
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default withRouter(ProductView);
