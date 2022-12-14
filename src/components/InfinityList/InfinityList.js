import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '~/components/Catalog/Catalog.scss';

import NewProductItem from '~/components/NewProduct/NewProductItem';

const cx = classNames.bind(styles);

function InfinityList({ data }) {
    return (
        <div className={cx('catalog__content__list')}>
            {data.map((item) => (
                <div key={item._id} className={cx('catalog__content__item')}>
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
