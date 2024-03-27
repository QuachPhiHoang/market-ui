import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Search.scss';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    return (
        <>
            <Link to={`categories/${data._id}`}>
                <div className={cx('search__item')}>
                    {data.images && data.images.length > 0 ? (
                        <div className={cx('search__item__img')}>
                            <img src={data.images[0].url} alt={data.name} />
                        </div>
                    ) : null}
                    <p className={cx('search__item__name')}>{data.name}</p>
                </div>
            </Link>
        </>
    );
}

export default SearchItem;
