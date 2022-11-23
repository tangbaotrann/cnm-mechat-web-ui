// libs
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './PhoneBook.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search';
import Conversation from '~/components/Conversation';
import Sidebar from '~/layouts/components/Sidebar';
import BoxChat from '~/components/BoxChat';
import ModelWrapper from '~/components/ModelWrapper';
import AddFriend from '~/components/AddFriend';
import FriendRequestList from './FriendRequest_list/FriendRequestList';
import Messenger from '~/layouts/components/Rightbar/Messenger';
import ConversationInfo from '~/layouts/components/Rightbar/ConversationInfo';
import socket from '~/util/socket';
import {
    listFriend,
    listGroupUser,
    listMeRequests,
    conversationSlice,
    userInfoSelector,
    listFriendAccept,
    addFriendRequest,
    addFriendRequestAccept,
} from '~/redux/selector';
import listFriendRequests from '~/redux/features/friend/friendRequestSlice';
import listGroupUsers from '~/redux/features/Group/GroupSlice';

const cx = classNames.bind(styles);

function PhoneBook() {
    const [openInfoAccount, setOpenInfoAccount] = useState(false);
    const [changeLayout, setChangeLayout] = useState(false);
    const [showConversation, setShowConversation] = useState('');

    const listFriends = useSelector(listFriend);
    const listMeRequest = useSelector(addFriendRequest);
    const listRequestFriend = useSelector(addFriendRequestAccept);
    const user = useSelector(userInfoSelector);
    const conversation = useSelector(conversationSlice);
    const listGroup = useSelector(listGroupUser);

    const dispatch = useDispatch();

    // console.log('listFriends', listFriends);

    // realtime socket (fetch user)
    useEffect(() => {
        socket.emit('status_user', user._id);

        socket.on('get_users', (users) => {
            console.log('USER - ONLINE -', users);
        });
    }, [user?._id]);

    // realtime with socket (wait accept)
    useEffect(() => {
        socket.on('receiver_friend_request', (request) => {
            // console.log('[receiver_friend_request]', request);
            dispatch(listFriendRequests.actions.arrivalAcceptFriendRequestFromSocket(request));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // realtime with socket (list accept)
    useEffect(() => {
        socket.on('me_friend', (request) => {
            // console.log('[me_friend]', request);
            dispatch(listFriendRequests.actions.arrivalAcceptFriendRequestFromSocket(request));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // re-call add friend
    useEffect(() => {
        socket.on('delete_friend_request', (requestId) => {
            // console.log('[delete_friend_request]', requestId);
            dispatch(listFriendRequests.actions.arrivalRecallRequestAddFriendFromSocket(requestId));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // realtime delete friend // arrivalDeleteConversationOutGroupFromSocket
    // listFriendRequests.actions.arrivalDeleteFriendFromSocket(conversationDeleted)
    useEffect(() => {
        socket.on('remove_conversation_block_group', (conversationDeleted) => {
            console.log('[remove_conversation_block_group]', conversationDeleted);
            dispatch(listGroupUsers.actions.arrivalDeleteConversationOutGroupFromSocket(conversationDeleted));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     socket.off('receive_friendss');
    //     socket.on('receive_friendss', (listFriendsUserDelete) => {
    //         console.log('[receive_friends]', listFriendsUserDelete);
    //         dispatch(listFriendRequests.actions.arrivalDeleteFriendFromSocket(listFriendsUserDelete));
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // realtime exit add friend
    useEffect(() => {
        socket.on('remove_request', (friendRequestID) => {
            // console.log('[remove_request]', friendRequestID);
            dispatch(listFriendRequests.actions.arrivalExitRequestAddFriendFromSocket(friendRequestID));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // realtime when accept success -> update conversation
    // useEffect(() => {
    //     socket.on('send_friends_give_conversation', (_conversation) => {
    //         console.log('[send_friends_give_conversation]', _conversation);
    //         dispatch(listFriendRequests.actions.arrivalUpdateConversationFromSocket(_conversation));
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const handleModelOpenInfoAccount = () => {
        setOpenInfoAccount(true);
    };

    const handleModelCloseInfoAccount = () => {
        setOpenInfoAccount(false);
    };

    const handleRequesfriend = () => {
        setShowConversation('');
        setChangeLayout(false);
    };

    const handleGroupChat = () => {
        setShowConversation('');
        setChangeLayout(true);
    };

    const tam = () => {
        console.log('60---', conversation);
        setShowConversation(conversation);
    };

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('wrapper-center')}>
                <div className={cx('search-info')}>
                    <Search />
                </div>
                <div className={cx('add-friend')} onClick={handleModelOpenInfoAccount}>
                    <NavLink>
                        <PersonAddAltIcon className={cx('item')} />
                    </NavLink>
                    <h2 className={cx('add-friend-title')}>Thêm bạn bằng số điện thoại</h2>
                </div>
                <div className={cx('list-add-friend')} onClick={handleRequesfriend}>
                    <img className={cx('list-add-friend-image')} src={images.listfriend} alt="" />
                    <h2 className={cx('list-add-friend-title')}>Danh sách kết bạn</h2>
                </div>
                <div className={cx('list-add-friend')} onClick={handleGroupChat}>
                    <img className={cx('list-add-friend-image')} src={images.groupchat} alt="" />
                    <h2 className={cx('list-add-friend-title')}>Danh sách nhóm</h2>
                </div>
                <div className={cx('list-friend')}>
                    <h1>Bạn bè ({listFriends?.length})</h1>

                    {/* Conversation or MiddleDirectory */}
                    <div className={cx('conversations')} onClick={tam}>
                        {listFriends?.map((user) => {
                            return (
                                <div key={user?._id}>
                                    <Conversation conversation={user} isPhoneBook />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {showConversation ? (
                <div className={cx('container')}>
                    <Messenger />
                    <ConversationInfo />
                </div>
            ) : (
                <div className={cx('wrapper-rightBar')}>
                    <div className={cx('header')}>
                        {!changeLayout ? (
                            <div className={cx('list-add-friend')}>
                                <img className={cx('list-add-friend-image')} src={images.listfriend} alt="" />
                                <h2 className={cx('list-add-friend-title2')}>Danh sách kết bạn</h2>
                            </div>
                        ) : (
                            <div className={cx('list-add-friend')}>
                                <img className={cx('list-add-friend-image')} src={images.groupchat} alt="" />
                                <h2 className={cx('list-add-friend-title2')}>Danh sách nhóm</h2>
                            </div>
                        )}
                        {!changeLayout ? (
                            <div className={cx('list-FriendRequest')}>
                                <div className={cx('friendRequest')}>
                                    {/* listAccept */}
                                    {listRequestFriend?.length === 0 ? null : (
                                        <h1>Lời mời kết bạn ({listRequestFriend?.length})</h1>
                                    )}
                                    {listRequestFriend?.map((user) => {
                                        return <FriendRequestList key={user.idFriendRequest} user={user} isPhoneBook />;
                                    })}
                                </div>
                                <div className={cx('meRequestFriend')}>
                                    {/* listMeRequest addFriendRequest */}
                                    {listMeRequest?.length === 0 ? null : (
                                        <h1>Yêu cầu kết bạn ({listMeRequest?.length})</h1>
                                    )}
                                    {listMeRequest?.map((_user) => {
                                        return (
                                            <>
                                                {_user?.receiverId === user?._id ? null : (
                                                    <FriendRequestList key={_user.idFriendRequest} user={_user} />
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className={cx('list-BoxChat')}>
                                {listGroup?.map((group) => {
                                    if (group.isGroup === true) {
                                        return <BoxChat key={group.id} group={group} />;
                                    }
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <ModelWrapper
                className={cx('model-add-friend')}
                open={openInfoAccount}
                onClose={handleModelCloseInfoAccount}
            >
                <div className={cx('model-add-friend-bg')}>
                    <div className={cx('add-friend-title-model')}>
                        <span className={cx('friend-title')}>Thêm bạn</span>
                        <button className={cx('close-btn')}>
                            <FontAwesomeIcon
                                className={cx('friend-close-ic')}
                                icon={faXmark}
                                onClick={handleModelCloseInfoAccount}
                            />
                        </button>
                    </div>
                    <AddFriend />
                </div>
            </ModelWrapper>
        </div>
    );
}

export default PhoneBook;
