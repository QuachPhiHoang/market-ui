import PropTypes from 'prop-types';

import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/components/Catalog/Catalog.scss';

import NewProductItem from '~/components/NewProduct/NewProductItem';

const cx = classNames.bind(styles);

function InfinityList({ data }) {
    const perLoad = 6;
    const listRef = useRef(null);
    const [datas, setDatas] = useState([]);
    const [load, setLoad] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setDatas(data.slice(0, perLoad));
        setIndex(1);
    }, [data]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (listRef && listRef.current) {
                if (
                    window.scrollY + window.innerHeight >=
                    listRef.current.clientHeight + listRef.current.scrollTop + 500
                ) {
                    setLoad(true);
                }
            }
        });
    }, [listRef]);

    useEffect(() => {
        const loadTimer = setInterval(() => {
            const getItems = () => {
                const pages = Math.floor(data.length / perLoad);
                const maxIndex = data.length % perLoad === 0 ? pages : pages + 1;

                if (load && index <= maxIndex) {
                    const start = perLoad * index;
                    const end = start + perLoad;

                    setDatas(datas.concat(data.slice(start, end)));
                    setIndex(index + 1);
                }
            };
            getItems();
            setLoad(false);
        }, 2000);
        return () => {
            clearInterval(loadTimer);
        };
    }, [load, index, data, datas]);

    return (
        <div className={cx('catalog__content__list')} ref={listRef}>
            {datas.map((item) => (
                <div key={item.id} className={cx('catalog__content__item')}>
                    <NewProductItem data={item} />
                </div>
            ))}
        </div>
    );
}

InfinityList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default InfinityList;
