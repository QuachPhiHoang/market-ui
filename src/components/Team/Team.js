import classNames from 'classnames/bind';
import styles from './Team.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Team() {
    return (
        <div className={cx('team')}>
            <div className={cx('team__title')}>The Founders</div>
            <div className={cx('team__thumbnail')}>
                <div className={cx('team__thumbnail-item')}>
                    <img srcSet={`${images.team1} 2x`} alt="team1" />
                    <p className={cx('team__thumbnail-name')}>HM Jawad</p>
                </div>
                <div className={cx('team__thumbnail-item')}>
                    <img srcSet={`${images.team2} 2x`} alt="team1" />
                    <p className={cx('team__thumbnail-name')}>Furqan Abid</p>
                </div>
                <div className={cx('team__thumbnail-item')}>
                    <img srcSet={`${images.team3} 2x`} alt="team1" />
                    <p className={cx('team__thumbnail-name')}>Abdullah Ah</p>
                </div>
                <div className={cx('team__thumbnail-item')}>
                    <img srcSet={`${images.team4} 2x`} alt="team1" />
                    <p className={cx('team__thumbnail-name')}>Abrar Khan</p>
                </div>
            </div>
        </div>
    );
}

export default Team;
