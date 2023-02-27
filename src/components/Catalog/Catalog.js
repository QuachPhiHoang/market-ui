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
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const cx = classNames.bind(styles);

function Catalog() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [price, setPrice] = useState([0, 500]);
    const [ratings, setRatings] = useState(0);

    const activePage = searchParams.get('page') || 1;
    const keyword = searchParams.get('keyword');
    const [currentPage, setCurrentPage] = useState(1);

    const [categories, setCategories] = useState('');
    const [gender, setGender] = useState('');

    const { products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const setCurrentPageNo = (e, value) => {
        setCurrentPage(value);
    };

    let count = filteredProductsCount;

    useEffect(() => {
        dispatch(getProducts({ keyword, currentPage: activePage, price, ratings, categories, gender }));
    }, [dispatch, currentPage, keyword, price, ratings, activePage, categories, gender]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [products]);

    const handleRemoveCheck = () => {
        setCategories('');
        setGender('');
        setPrice([0, 500]);
        setRatings(0);
    };

    const handleChangePrice = (e, newPrice) => {
        setPrice(newPrice);
    };
    const handleChangeRatings = (e, newRatings) => {
        setRatings(newRatings);
    };

    const handleChangeCategory = (e) => {
        if (e.target.checked) {
            setCategories(e.target.value);
        }
    };
    const handleChangeGender = (e) => {
        if (e.target.checked) {
            setGender(e.target.value);
        }
    };

    return (
        <div className={cx('catalog')}>
            <div className={cx('catalog__filter')}>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Product</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {categoryData.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <input
                                    type="radio"
                                    value={item.categorySlug}
                                    name={item.display}
                                    onChange={handleChangeCategory}
                                    checked={item.categorySlug === categories}
                                />
                                <label>{item.display}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Gender</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {genderData.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <input
                                    type="radio"
                                    value={item.gender}
                                    name={item.display}
                                    onChange={handleChangeGender}
                                    checked={item.gender === gender}
                                />
                                <label>{item.display}</label>
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
                <InfinityList data={products} />
                <div className={cx('catalog__pagination')}>
                    {resultPerPage < count ? (
                        <Pagination
                            page={Number(activePage)}
                            count={Math.ceil(count / resultPerPage)}
                            onChange={setCurrentPageNo}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
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
                                            ? keyword
                                                ? `?keyword=${keyword}&page=1`
                                                : `?page=${item.page}`
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
