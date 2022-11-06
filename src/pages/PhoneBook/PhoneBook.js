// libs
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './PhoneBook.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search';
import Conversation from '~/components/Conversation';
import Sidebar from '~/layouts/components/Sidebar';
import BoxChat from '~/components/BoxChat';
import { listFriend, listFriendAccept, listGroupUser, listMeRequests } from '~/redux/selector';
import ModelWrapper from '~/components/ModelWrapper';
import AddFriend from '~/components/AddFriend';
import FriendRequestList from './FriendRequest_list/FriendRequestList';

import Messenger from '~/layouts/components/Rightbar/Messenger';
import ConversationInfo from '~/layouts/components/Rightbar/ConversationInfo';

const cx = classNames.bind(styles);

function PhoneBook() {
    const [openInfoAccount, setOpenInfoAccount] = useState(false);
    const [changeLayout, setChangeLayout] = useState(false);
    const [showConversation, setShowConversation] = useState('');

    const listFriends = useSelector(listFriend);
    const conversation = useSelector((state) => state.conversations.conversationClick);
    const listGroup = useSelector(listGroupUser);
    // const conversation = useSelector((state) => state.conversations.conversationClick);
    // const message = useSelector((state) => state.messages.clickSendMessage);

    // console.log('[conversation] - ', conversation);
    // console.log('[LIST FRIEND - ] - ', listFriends);
    const listAccept = useSelector(listFriendAccept);

    const listMeRequest = useSelector(listMeRequests);

    //
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
                                    <Conversation conversation={user} isPhoneBook />;
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
                                    {listAccept?.length === 0 ? null : <h1>Lời mời kết bạn ({listAccept?.length})</h1>}
                                    {listAccept?.map((user) => {
                                        return <FriendRequestList key={user.idFriendRequest} user={user} isPhoneBook />;
                                    })}
                                </div>
                                <div className={cx('meRequestFriend')}>
                                    {listMeRequest?.length === 0 ? null : (
                                        <h1>Yêu cầu kết bạn ({listMeRequest?.length})</h1>
                                    )}
                                    {listMeRequest?.map((user) => {
                                        return <FriendRequestList key={user.idFriendRequest} user={user} />;
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
