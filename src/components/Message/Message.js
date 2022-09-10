// libs
import classNames from 'classnames/bind';

// me
import styles from './Message.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Message({ own }) {
    return (
        <>
            {own ? (
                <div className={cx('own')}>
                    <div className={cx('message-top')}>
                        <p className={cx('message-top-text')}>Hello my friend ...</p>
                        <img className={cx('message-top-img')} src={images.noImg} alt="" />
                    </div>
                    <span className={cx('message-bottom')}>1 giờ trước</span>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('message-top')}>
                        <img className={cx('message-top-img')} src={images.noImg} alt="" />
                        <p className={cx('message-top-text')}>Hello my friend ...</p>
                    </div>
                    <span className={cx('message-bottom')}>1 giờ trước</span>
                </div>
            )}
        </>
    );
}

export default Message;
