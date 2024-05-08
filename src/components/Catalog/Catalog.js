import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
// import CheckBox from '~/components/CheckBox';
import styles from './Catalog.scss';
// import { getProducts } from '~/redux/product-modal/productsSlice';
import { getAllProductsSearching } from '~/redux/product-modal/productSearchSlice';
import InfinityList from '~/components/InfinityList';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const cx = classNames.bind(styles);
const categories = ['Áo Thun', 'Áo Sơ Mi', 'Áo Polo', 'Áo Hoodie', 'Áo Khoác', 'Quần Jean'];
const genders = ['Female', 'Male'];

function Catalog() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [price, setPrice] = useState([0, 500]);
    const [ratings, setRatings] = useState(0);

    const activePage = searchParams.get('page') || 1;
    const keyword = searchParams.get('keyword');
    const [currentPage, setCurrentPage] = useState(1);

    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');

    const { products, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const setCurrentPageNo = (e, value) => {
        setCurrentPage(value);
    };

    let count = filteredProductsCount;
    const marksPrice = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 100,
            label: '100',
        },
        {
            value: 200,
            label: '200',
        },
        {
            value: 300,
            label: '300',
        },
        {
            value: 400,
            label: '400',
        },
        {
            value: 500,
            label: '500',
        },
    ];
    const markRating = [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ];

    useEffect(() => {
        dispatch(getAllProductsSearching({ keyword, currentPage: activePage, price, ratings, category, gender }));
    }, [dispatch, currentPage, keyword, price, ratings, activePage, category, gender]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [products]);

    const handleRemoveCheck = () => {
        setCategory('');
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
            setCategory(e.target.value);
        } else {
            setCategory('');
        }
    };
    const handleChangeGender = (e) => {
        if (e.target.checked) {
            setGender(e.target.value);
        } else {
            setGender('');
        }
    };

    return (
        <div className={cx('catalog')}>
            <div className={cx('catalog__filter')}>
                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Product</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {categories.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <input
                                    type="checkbox"
                                    value={item}
                                    name={item}
                                    onChange={handleChangeCategory}
                                    checked={item === category}
                                />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('catalog__filter__widget')}>
                    <div className={cx('catalog__filter__widget__title')}>Category Gender</div>
                    <div className={cx('catalog__filter__widget__content')}>
                        {genders.map((item, index) => (
                            <div key={index} className={cx('catalog__filter__widget__content__item')}>
                                <input
                                    type="checkbox"
                                    value={item}
                                    name={item}
                                    onChange={handleChangeGender}
                                    checked={item === gender}
                                />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog__filter__widget')}>
                    <Typography className={cx('catalog__filter__widget__title')}>Category Price</Typography>
                    <Slider
                        aria-label="Always visible"
                        className={cx('form-range')}
                        min={0}
                        max={500}
                        value={price}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        getAriaLabel={() => 'range-slider'}
                        step={100}
                        marks={marksPrice}
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
                        marks={markRating}
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
