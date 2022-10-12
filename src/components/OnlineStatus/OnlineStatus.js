// lib
import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

// me
import styles from './OnlineStatus.module.scss';

const cx = classNames.bind(styles);

function OnlineStatus({ onlineUsers, conversation }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    const user = useSelector((state) => state.user.data);

    // console.log('FRIEND - ', friends);
    // console.log('[onlineFriends] - ', onlineFriends);
    // console.log('[conversation] - ', conversation);
    // console.log('[onlineUsers] - ', onlineUsers);

    // fetch api friends
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}friends/${user._id}`);
                console.log('ONLINE FRIEND - ', res.data);
                setFriends(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, [user._id]);

    // handle online friends
    useEffect(() => {
        setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend.id)));
    }, [friends, onlineUsers]);

    return (
        <>
            {onlineFriends.length > 0 ? (
                onlineFriends.map((onlineFriend) => {
                    return (
                        <div className={cx('container')} key={onlineFriend.id}>
                            <div className={cx('status')}>
                                <img
                                    className={cx('avatar-image-status-online')}
                                    src={onlineFriend.avatarLink}
                                    alt=""
                                />
                                <div className={cx('badge')}></div>
                            </div>
                            <div className={cx('info')}>
                                <h3 className={cx('username')}>{onlineFriend.fullName}</h3>
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
