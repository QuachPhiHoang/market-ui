import classNames from 'classnames/bind';
import styles from './FilterProduct.scss';
import { Box } from '@mui/joy';
// import icons from '~/assets/icons';

const cx = classNames.bind(styles);

function Filter({ column: { filterValue, setFilter } }) {
    return (
        <div className={cx('filter')}>
            <Box className={cx('filter__box')}>
                <input
                    className={cx('filter__input')}
                    type="text"
                    placeholder="Search your SKU"
                    value={filterValue || ''}
                    onChange={(e) => setFilter(e.target.value || undefined)}
                />
            </Box>
        </div>
    );
}

export default Filter;
