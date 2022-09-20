// libs
import classNames from 'classnames/bind';
import { useState} from 'react'
// me
import styles from './Conversation.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Conversation({ user }) {
    const [showGotoTop,setShowGoToTop] =useState(true)

    return (
        <div className={cx('list-conversation')}>
            <img className={cx('avatar-img')} src={user.userImg ? user.userImg : images.noImg} alt="avatar" />

            <div className={cx('content')}>
                <h4 className={cx('username')}>{user.username}</h4>
                 {/* <p className={cx('message')} >Hello my friend ...</p>  */}
            </div>
            {showGotoTop &&( <div className={cx('notification')}>
                <span className={cx('time')}>3 giờ</span>
                <span className={cx('badge')}>5+</span>
                 </div> )}
        </div>
    );
}

export default Conversation;
