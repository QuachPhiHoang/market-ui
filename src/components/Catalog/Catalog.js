import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import CheckBox from '~/components/CheckBox';
import styles from './Catalog.scss';
// import NewProductItem from '~/components/NewProduct/NewProductItem';
import categoryData from '~/fakeDataCategory';
import ProductData from '~/fakeData';
import colorData from '~/fakeDataColor';
import sizeData from '~/fakeDataSize';
import genderData from '~/fakeGenderData';
import InfinityList from '~/components/InfinityList';

const cx = classNames.bind(styles);

function Catalog() {
    const initFilter = {
        category: [],
        color: [],
        size: [],
        gender: [],
    };

    const productList = ProductData.ProductItem;
    const [products, setProduct] = useState(productList);

    const [filter, setFilter] = useState(initFilter);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [products]);

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
        let temp = productList;
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
            // temp = temp.filter((e) => {
            //     const check = e.gender.find((gender) => filter.gender.includes(gender));
            //     return check !== undefined;
            // });
            temp = temp.filter((e) => filter.gender.includes(e.gender));
        }
        setProduct(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProduct();
    }, [updateProduct]);

    const handleRemoveCheck = () => {
        setFilter(initFilter);
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
            </div>
        </div>
    );
}

export default Catalog;
