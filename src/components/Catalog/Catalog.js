import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, Link, Navigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';
import styles from './Catalog.scss';
import categoryData from '~/fakeDataCategory';
import { getProducts } from '~/redux/product-modal/productsSlice';
import colorData from '~/fakeDataColor';
import sizeData from '~/fakeDataSize';
import genderData from '~/fakeGenderData';
import InfinityList from '~/components/InfinityList';
// import Pagination from 'react-js-pagination';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const cx = classNames.bind(styles);

function Catalog() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [price, setPrice] = useState([0, 500]);
    const [ratings, setRatings] = useState(0);
    const navigate = useNavigate();

    const Pagenow = searchParams.get('page') || 1;
    const keyword = searchParams.get('keyword');
    const [currentPage, setCurrentPage] = useState(1);

    const { products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const setCurrentPageNo = (e, value) => {
        setCurrentPage(value);
    };

    let count = filteredProductsCount;

    useEffect(() => {
        dispatch(getProducts({ keyword, currentPage: Pagenow, price, ratings }));
    }, [dispatch, currentPage, keyword, price, ratings, Pagenow]);

    const initFilter = {
        category: [],
        color: [],
        size: [],
        gender: [],
    };
    const [product, setProduct] = useState(products);
    const [filter, setFilter] = useState(initFilter);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                case 'GENDER':
                    setFilter({ ...filter, gender: [...filter.gender, item.gender] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                case 'GENDER':
                    const newGender = filter.gender.filter((e) => e !== item.gender);
                    setFilter({ ...filter, gender: newGender });
                    break;
                default:
            }
        }
    };

    const updateProduct = useCallback(() => {
        let temp = products;
        if (filter.category.length > 0) {
            temp = temp.filter((e) => filter.category.includes(e.categorySlug));
        }
        if (filter.color.length > 0) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => filter.color.includes(color));
                return check !== undefined;
            });
        }
        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check !== undefined;
            });
        }
        if (filter.gender.length > 0) {
            temp = temp.filter((e) => filter.gender.includes(e.gender));
        }
        setProduct(temp);
    }, [filter, products]);

    useEffect(() => {
        updateProduct();
    }, [updateProduct]);

    const handleRemoveCheck = () => {
        setFilter(initFilter);
        setPrice([0, 500]);
    };

    const handleChangePrice = (e, newPrice) => {
        setPrice(newPrice);
    };
    const handleChangeRatings = (e, newRatings) => {
        setRatings(newRatings);
    };

    return (
        <div className={cx('catalog')}>
            <div className={cx('catalog__filter')}>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Product</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {categoryData.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <CheckBox
                                    label={item.display}
                                    onChange={(input) => {
                                        filterSelect('CATEGORY', input.checked, item);
                                    }}
                                    checked={filter.category.includes(item.categorySlug)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Color</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {colorData.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <CheckBox
                                    label={item.display}
                                    onChange={(input) => {
                                        filterSelect('COLOR', input.checked, item);
                                    }}
                                    checked={filter.color.includes(item.color)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Size</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {sizeData.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <CheckBox
                                    label={item.display}
                                    onChange={(input) => {
                                        filterSelect('SIZE', input.checked, item);
                                    }}
                                    checked={filter.size.includes(item.size)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Gender</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {genderData.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <CheckBox
                                    label={item.display}
                                    onChange={(input) => {
                                        filterSelect('GENDER', input.checked, item);
                                    }}
                                    checked={filter.gender.includes(item.gender)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <Typography className={cx('catalog__filter__widget__title')}>Category Price</Typography>
                    <Slider
                        className={cx('form-range')}
                        min={0}
                        max={500}
                        value={price}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => 'range-slider'}
                        step={100}
                        marks
                        getAriaValueText={(price) => `${price}$`}
                        defaultValue={0}
                    />
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <Typography className={cx('catalog__filter__widget__title')}>Category Ratings</Typography>
                    <Slider
                        className={cx('form-range')}
                        min={0}
                        max={5}
                        value={ratings}
                        onChange={handleChangeRatings}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => 'range-slider'}
                        step={1}
                        marks
                    />
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__content')}>
                        <Button
                            primary
                            className={cx('catalog__filter__widget__content__btn')}
                            onClick={handleRemoveCheck}
                        >
                            <p>Remove List</p>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('catalog__content')}>
                <InfinityList data={product} />
                <div className={cx('catalog__pagination')}>
                    {resultPerPage < count ? (
                        <Pagination
                            page={Pagenow}
                            count={Math.ceil(productsCount / resultPerPage)}
                            onChange={setCurrentPageNo}
                            defaultPage={1}
                            siblingCount={1}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/category${
                                        item.page === 1 && keyword === null
                                            ? ''
                                            : item.page !== 1 && keyword !== null
                                            ? `?keyword=${keyword}&page=${item.page}`
                                            : item.page !== 1 || keyword !== null
                                            ? item.page
                                                ? `?page=${item.page}`
                                                : `?keyword=${keyword}`
                                            : `?page=${item.page}`
                                    }`}
                                    {...item}
                                />
                            )}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Catalog;
