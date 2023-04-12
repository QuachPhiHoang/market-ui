import classNames from 'classnames/bind';
import styles from './Review.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useState } from 'react';
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createReview } from '~/redux/reviews/reviewsSlice';

const cx = classNames.bind(styles);

function ModalReviews({ setOpenModalReviews, id }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();

    const handleSubmitReviews = () => {
        const myForm = new FormData();
        myForm.set('rating', rating);
        myForm.set('comment', comment);
        dispatch(createReview({ id, myForm: myForm }));
        setOpenModalReviews(false);
    };

    return (
        <div className={cx('modal-reviews')}>
            <div className={cx('modal-reviews__container')}>
                <Button
                    text
                    small
                    className={cx('modal-reviews__btn-close')}
                    onClick={() => {
                        setOpenModalReviews(false);
                    }}
                >
                    X
                </Button>
                <form className={cx('modal-reviews__form')}>
                    <div className={cx('modal-reviews__form__title')}>Comment Review For Product</div>
                    <textarea
                        className={cx('modal-reviews__form__comment')}
                        type="text"
                        placeholder="Enter your review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Rating
                        className={cx('modal-reviews__form__rating')}
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <div className={cx('modal-reviews__form__btn')}>
                        <Button
                            primary
                            small
                            onClick={() => {
                                setOpenModalReviews(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button primary small onClick={handleSubmitReviews}>
                            Submit Reviews
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalReviews;
