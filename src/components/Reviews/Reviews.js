import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames/bind';
import styles from './Review.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Reviews({ review }) {
    const options = {
        count: 5,
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: '#E6E650',
        value: review.rating ? review.rating : 0,
        isHalf: true,
    };

    return (
        <div className={cx('review-card')}>
            <img src={images.profile} alt="profile" className={cx('review-card__img')} />
            <div className={cx('review-card__profile')}>
                <p className={cx('review-card__profile__name')}>{review.user.username}</p>
                <ReactStars {...options} />
                <p className={cx('review-card__profile__comment')}>{review.comment}</p>
            </div>
        </div>
    );
}

export default Reviews;
