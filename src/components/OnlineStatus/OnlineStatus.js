// lib
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// me
import styles from './OnlineStatus.module.scss';
import { listFriend } from '~/redux/selector';

const cx = classNames.bind(styles);

function OnlineStatus({ onlineUsers, conversation }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    const listFriends = useSelector(listFriend);

    // console.log('[LIST FRIEND - ] - ', listFriends);
    // console.log('FRIEND - ', friends);
    // console.log('[onlineFriends] - ', onlineFriends);
    // console.log('[conversation] - ', conversation);
    // console.log('[onlineUsers] - ', onlineUsers);

    // fetch api friends
    useEffect(() => {
        setFriends(listFriends);
    }, [listFriends]);

    // handle online friends
    useEffect(() => {
        setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers]);

    return (
        <>
            {onlineFriends.length > 0 ? (
                onlineFriends.map((onlineFriend) => {
                    return (
                        <div className={cx('container')} key={onlineFriend._id}>
                            <div className={cx('status')}>
                                <img
                                    className={cx('avatar-image-status-online')}
                                    src={onlineFriend.imageLinkOfConver}
                                    alt=""
                                />
                                <div className={cx('badge')}></div>
                            </div>
                            <div className={cx('info')}>
                                <h3 className={cx('username')}>{onlineFriend.name}</h3>
                                <span className={cx('time-online')}>Vừa mới truy cập</span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    <img className={cx('avatar-image')} src={conversation.imageLinkOfConver} alt="" />
                    <div className={cx('info')}>
                        <h3 className={cx('username')}>{conversation.name}</h3>
                        <span className={cx('time-online')}>Offline</span>
                    </div>
                </>
            )}
        </>
    );
}

export default OnlineStatus;
