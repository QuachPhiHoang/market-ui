import classNames from 'classnames/bind';
import styles from './GlobalFilterProduct.scss';
import { Box } from '@mui/joy';

const cx = classNames.bind(styles);

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className={cx('global-filter')}>
            <Box className={cx('global-filter__box')}>
                <input
                    className={cx('global-filter__input')}
                    type="text"
                    placeholder="Search your SKU"
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </Box>
        </div>
    );
};

export default GlobalFilter;
