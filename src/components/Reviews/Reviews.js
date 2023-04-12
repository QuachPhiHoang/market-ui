import classNames from 'classnames/bind';
import styles from './Review.scss';
import images from '~/assets/images';
import { Rating } from '@mui/material';

const cx = classNames.bind(styles);

function Reviews({ review }) {
    const options = {
        size: 'large',
        value: review?.rating ? review?.rating : 0,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className={cx('review-card')}>
            <img src={images.profile} alt="profile" className={cx('review-card__img')} />
            <div className={cx('review-card__profile')}>
                <p className={cx('review-card__profile__name')}>{review?.user?.username}</p>
                <Rating {...options} />
                <p className={cx('review-card__profile__comment')}>{review?.comment}</p>
            </div>
        </div>
    );
}

export default Reviews;
