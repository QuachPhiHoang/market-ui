import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.scss';
import icons from '~/assets/icons';
import Button from '~/components/Button';
import SearchItem from './SearchItem';
import { useDebounced } from '~/hooks/useDebounced';
import { useDispatch, useSelector } from 'react-redux';
import { getProductSearch } from '~/redux/product-modal/productSearchSlice';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [showResult, setShowResult] = useState('false');
    const debouncedValue = useDebounced(keyword, 500);
    const { product, filteredProductsCount, resultPerPage } = useSelector((state) => state.productSearch);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            return;
        }
        if (debouncedValue) {
            dispatch(getProductSearch(debouncedValue));
        }
    }, [debouncedValue, dispatch]);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/category?keyword=${keyword}`);
        }
    };
    //
    const handleChange = (e) => {
        const searchKeyword = e.target.value;
        if (!searchKeyword.startsWith(' ')) {
            return setKeyword(searchKeyword);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClear = () => {
        setShowResult(false);
        setKeyword('');
    };

    return (
        <div>
            <HeadlessTippy
                visible={showResult && keyword}
                interactive
                offset={[12, 8]}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('search__result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {product.length === 0 ? (
                                <p className={cx('search__notification')}>No Products</p>
                            ) : (
                                product?.map((item) => <SearchItem data={item} key={item._id} />)
                            )}
                            {filteredProductsCount >= resultPerPage && product.length > 0 ? (
                                <div className={cx('search__all')} onClick={searchSubmitHandler}>
                                    See All Products
                                </div>
                            ) : null}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <form className={cx('search__input')} onSubmit={searchSubmitHandler}>
                        <input
                            value={keyword}
                            type="text"
                            placeholder="Search a product..."
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                        />
                        {keyword && showResult && (
                            <p className={cx('search__clear')} onClick={handleClear}>
                                <span>x</span>
                            </p>
                        )}
                        <div>
                            <Button className={cx('search__btn')}>
                                <img src={icons.search} alt="search" />
                            </Button>
                        </div>
                    </form>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
