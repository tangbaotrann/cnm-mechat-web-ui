// libs
import classNames from 'classnames/bind';
import images from '~/assets/images';

// me
import styles from './Rightbar.module.scss';
import { FetchUsers as user } from '~/FetchData';
import Messenger from './Messenger';
import ConversationInfo from './ConversationInfo';

const cx = classNames.bind(styles);

function Rightbar() {
    return (
        <div className={cx('wrapper')}>
            {/* Để show ra Chat current -> get theo conversationId */}
            {user ? (
                <div className={cx('container')}>
                    <Messenger />
                    <ConversationInfo />
                </div>
            ) : (
                <div className={cx('container-messages')}>
                    <div className={cx('intro')}>
                        <span className={cx('title')}>
                            Chào mừng đến với <b>MeChat PC!</b>
                        </span>
                        <p className={cx('description')}>
                            Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu
                            hóa trên máy tính của bạn.
                        </p>
                        <div className={cx('slide-bar-img')}>
                            <img className={cx('logo-img')} src={images.logo} alt="Logo" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rightbar;
