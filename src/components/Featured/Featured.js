import classNames from 'classnames/bind';
import styles from './Featured.scss';
import Button from '~/components/Button';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Featured() {
    return (
        <div className={cx('featured')}>
            <div className={cx('featured__list')}>
                <div className={cx('featured__items')}>
                    <div className={cx('featured__items-thumbnail')}>
                        <img srcSet={`${images.featured2} 2x`} alt="featured1" />
                    </div>
                    <Button primary className={cx('featured__items-btn')}>
                        Buy now
                    </Button>
                </div>
                <div className={cx('featured__items')}>
                    <div className={cx('featured__items-thumbnail')}>
                        <img srcSet={`${images.featured1} 2x`} alt="featured2" />
                    </div>
                    <Button primary className={cx('featured__items-btn')}>
                        Buy now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Featured;
