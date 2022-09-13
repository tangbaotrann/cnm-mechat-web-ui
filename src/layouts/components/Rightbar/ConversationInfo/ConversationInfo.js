// libs
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './ConversationInfo.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function ConversationInfo() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title-name')}>Thông tin hội thoại</h2>

                <div className={cx('separator')}></div>

                <div className={cx('info')}>
                    <div className={cx('info-avatar')}>
                        <img className={cx('avatar')} src={images.avt} alt="avatar" />
                    </div>
                    <div className={cx('info-name')}>
                        <h3 className={cx('name')}>Bảo Trấn</h3>
                    </div>
                </div>

                <div className={cx('separator')}></div>

                <div className={cx('list-image')}>
                    <div className={cx('header')}>
                        <span className={cx('header-title')}>Ảnh/ Video</span>
                        <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                    </div>
                    <div className={cx('body')}>
                        {/* render image (map) */}
                        <div className={cx('body-list-image')}>
                            <img className={cx('item-image')} src={images.avt} alt="avatar" />
                        </div>
                        <div className={cx('body-list-image')}>
                            <img className={cx('item-image')} src={images.avt} alt="avatar" />
                        </div>
                        <div className={cx('body-list-image')}>
                            <img className={cx('item-image')} src={images.avt} alt="avatar" />
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <button className={cx('footer-btn-all')}>Xem tất cả</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationInfo;
