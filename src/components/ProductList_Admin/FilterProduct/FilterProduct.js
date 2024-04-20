import classNames from 'classnames/bind';
import styles from './FilterProduct.scss';
import { Box } from '@mui/joy';
// import icons from '~/assets/icons';

const cx = classNames.bind(styles);

function Filter({ columnFilters, setColumnFilters }) {
    const SKUName = columnFilters.find((f) => f.id === 'SKU')?.value || '';

    const onFilterChange = (id, value) => {
        const searchKeyword = value;
        if (!searchKeyword.startsWith(' ')) {
            return setColumnFilters((prev) => prev.filter((f) => f.id !== id).concat({ id, value }));
        }
    };
    return (
        <div className={cx('filter')}>
            <Box className={cx('filter__box')}>
                <input
                    className={cx('filter__input')}
                    type="text"
                    placeholder="Search your SKU"
                    value={SKUName}
                    onChange={(e) => onFilterChange('SKU', e.target.value)}
                />
            </Box>
        </div>
    );
}

export default Filter;
