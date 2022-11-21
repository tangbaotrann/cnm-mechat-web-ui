// libs
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { MoreHoriz } from '@material-ui/icons';
import { faEllipsis, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';

// me
import styles from './Conversation.module.scss';
import images from '~/assets/images';
import Popper from '../Popper';
import { fetchApiDeleteFriend } from '~/redux/features/friend/friendRequestSlice';
import ModelInfoAccount from '../ModelWrapper/ModelInfoAccount';
import { useEffect, useState } from 'react';
import {
    blockMember,
    cancelBlockMember,
    deleteConversation,
    deleteMember,
    fetchApiConversationById,
    fetchApiDeleteConversationSingle,
    outGroup,
} from '~/redux/features/Group/GroupSlice';
import { friendRequests } from '~/redux/features/friend/friendRequestSlice';
import { infoUserConversation } from '~/redux/features/user/userCurrent';
import {
    filterFriendGroup,
    filterLeader,
    listGroupUser,
    userInfoSelector,
    userLogin,
    conversationSlice,
    notificationsMessage,
} from '~/redux/selector';

const cx = classNames.bind(styles);

function Conversation({ conversation, isPhoneBook, Group, conversationInfo }) {
    const [Friend, setFriend] = useState(false);

    const dispatch = useDispatch();

    const infoUser = useSelector(userLogin);
    const filterLeaders = useSelector(filterLeader);
    const listFriendFilters = useSelector(filterFriendGroup);
    const user = useSelector(userInfoSelector);
    const conversationID = useSelector(conversationSlice);
    const conversations = useSelector(listGroupUser);
    const notifications = useSelector(notificationsMessage);

    // console.log('55 - ', conversation);

    useEffect(() => {
        dispatch(fetchApiConversationById(user._id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);

    useEffect(() => {
        listFriendFilters?.map((key) => {
            if (key._id === conversation._id) {
                setFriend(true);
            }
        });
    }, []);

    const handleCancel = () => {
        let deletes = window.confirm('Bạn có chắc chắn muốn xóa không?');
        if (deletes === true) {
            const data = {
                idUser: infoUser._id,
                status: true,
                userDeleteId: conversation._id,
            };
            dispatch(fetchApiDeleteFriend(data));
            alert('Xóa bạn thành công.');
        } else {
            alert('Bạn đã hủy yêu cầu xóa bạn!');
        }
    };

    // Sai
    // const tam = () => {
    //     conversations.map((c) => {
    //         if (c.members.includes(conversation._id)) {
    //             if (c.isGroup === false) {
    //                 return dispatch(conversationSlice.actions.clickConversation(c));
    //             }
    //         }
    //     });
    // };

    //xoa thanh vien khoi nhom
    const handleDeleteMemberGroup = () => {
        let deletes = window.confirm('Bạn có chắc chắn muốn xóa không?');
        if (deletes === true) {
            const data = {
                conversationId: conversationID.id,
                memberId: conversation._id,
                mainId: filterLeaders[0]._id,
            };
            dispatch(deleteMember(data));
            alert('Xóa thành viên thành công');
        } else {
            alert('bạn đã hủy yêu cầu xóa bạn');
        }
    };

    //roi nhom
    const handleOutGroup = () => {
        let checkOutGroup = window.confirm('Bạn có chắc chắn muốn rời nhóm không?');
        if (checkOutGroup === true) {
            const dataOutGroup = {
                userId: infoUser._id,
                conversationId: conversationID.id,
            };
            dispatch(outGroup(dataOutGroup));
            if (outGroup()) {
                alert('Bạn đã rời khỏi nhóm thành công');
                // window.location.reload(true);
            }
        } else {
            alert('bạn đã hủy yêu cầu rời nhóm');
        }
    };

    //kết bạn
    const handleAddFriend = () => {
        const data = { senderID: infoUser._id, receiverID: conversation._id };
        let tam = dispatch(friendRequests(data));
        if (tam) {
            alert('Gửi lời mời kết bạn thành công');
            window.location.reload(true);
        }
    };

    const handleSeeninfoInGroup = () => {
        dispatch(
            infoUserConversation({
                userID: conversation._id,
            }),
        );
    };

    const handleDeleteGroup = () => {
        let checkOutGroup = window.confirm('Bạn có chắc chắn muốn giải tán nhóm không?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationID.id,
                mainId: filterLeaders[0]._id,
            };
            dispatch(deleteConversation(data));
            if (deleteConversation()) {
                alert('Bạn đã giải tán nhóm');
                // window.location.reload(true);
            }
        } else {
            alert('bạn đã hủy yêu cầu giải tán nhóm');
        }
    };

    // handle block message user
    const handleBlockMember = () => {
        let checkOutGroup = window.confirm('Bạn có chắc chắn muốn chặn tin nhắn không?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationID.id,
                userId: conversation._id,
            };
            dispatch(blockMember(data));
            if (blockMember()) {
                alert('Bạn đã chặn tin nhắn');
            }
        } else {
            alert('bạn đã hủy yêu cầu chặn tin nhắn');
        }
    };

    // handle un-block message user
    const handleCancelBlockMember = () => {
        let checkOutGroup = window.confirm('Bạn có chắc chắn muốn bỏ chặn tin nhắn không?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationID.id,
                userId: conversation._id,
            };
            dispatch(cancelBlockMember(data));
            if (cancelBlockMember()) {
                alert('Bạn đã bỏ chặn tin nhắn');
            }
        } else {
            alert('bạn đã hủy yêu cầu bỏ chặn tin nhắn');
        }
    };

    // handle delete conversation single
    const handleDeleteConversationSingle = () => {
        const choice = window.confirm('Bạn có chắc chắn muốn xóa cuộc hội thoại này không?');

        if (choice === true) {
            dispatch(
                fetchApiDeleteConversationSingle({
                    conversationId: conversation.id,
                    userId: user._id,
                }),
            );
            alert('Bạn đã xóa thành công cuộc hội thoại.');
        } else {
            alert('Bạn đã đã hủy yêu cầu xóa cuộc hội thoại!');
        }
    };

    return (
        <>
            {conversationInfo ? (
                <div className={cx('list-conversation')} onClick={handleSeeninfoInGroup}>
                    <img
                        className={cx('avatar-img')}
                        src={conversation?.imageLinkOfConver ? conversation?.imageLinkOfConver : images.noImg}
                        alt="avatar-user"
                    />

                    {/* <ModelInfoAccount seenInfoInGroup user={userCurrent} /> */}

                    {filterLeaders[0]._id === conversation._id ? (
                        <div className={cx('key-leader')}>
                            <label htmlFor="file-info" className={cx('option-avatar')}>
                                <FontAwesomeIcon className={cx('icon-camera')} icon={faKey} />
                            </label>
                        </div>
                    ) : null}
                    <div className={cx('content')}>
                        <h4 className={cx('username')}>{conversation?.name} </h4>
                    </div>

                    {!Friend && infoUser._id !== conversation._id ? (
                        <div className={cx('button-addFriend')} onClick={handleAddFriend}>
                            <button>kết bạn</button>
                        </div>
                    ) : null}

                    {filterLeaders[0]._id === conversation._id && infoUser._id === filterLeaders[0]._id ? (
                        <TippyHeadless
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Popper className={cx('own-menu-list-children')}>
                                        <p className={cx('deleteFriend')} onClick={handleOutGroup}>
                                            <button className={cx('item-btn')}>Rời nhóm</button>
                                        </p>
                                        <p className={cx('deleteFriend')} onClick={handleDeleteGroup}>
                                            <button className={cx('item-btn')}>Giải tán nhóm</button>
                                        </p>
                                    </Popper>
                                </div>
                            )}
                            interactive
                            trigger="click"
                            placement="bottom-start"
                            offset={[4, 4]}
                        >
                            <Tippy className={cx('tool-tip')} content="Lựa chọn" delay={[200, 0]}>
                                <div>
                                    <MoreHoriz className={cx('item')} />
                                </div>
                            </Tippy>
                        </TippyHeadless>
                    ) : (
                        <>
                            {infoUser._id === filterLeaders[0]._id ? (
                                <TippyHeadless
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <Popper className={cx('own-menu-list-children')}>
                                                <p className={cx('deleteFriend')} onClick={handleDeleteMemberGroup}>
                                                    <button className={cx('item-btn')}>Xóa khỏi nhóm</button>
                                                </p>

                                                {conversationID.blockBy.includes(conversation._id) ? (
                                                    <p className={cx('deleteFriend')} onClick={handleCancelBlockMember}>
                                                        <button className={cx('item-btn')}>Đã chặn</button>
                                                    </p>
                                                ) : (
                                                    <p className={cx('deleteFriend')} onClick={handleBlockMember}>
                                                        <button className={cx('item-btn')}>Chặn tin nhắn</button>
                                                    </p>
                                                )}
                                            </Popper>
                                        </div>
                                    )}
                                    interactive
                                    trigger="click"
                                    placement="bottom-start"
                                    offset={[4, 4]}
                                >
                                    <Tippy className={cx('tool-tip')} content="Lựa chọn" delay={[200, 0]}>
                                        <div>
                                            <MoreHoriz className={cx('item')} />
                                        </div>
                                    </Tippy>
                                </TippyHeadless>
                            ) : (
                                <>
                                    {infoUser._id === conversation._id ? (
                                        <TippyHeadless
                                            render={(attrs) => (
                                                <div tabIndex="-1" {...attrs}>
                                                    <Popper className={cx('own-menu-list-children')}>
                                                        <p className={cx('deleteFriend')} onClick={handleOutGroup}>
                                                            <button className={cx('item-btn')}>Rời nhóm</button>
                                                        </p>
                                                    </Popper>
                                                </div>
                                            )}
                                            interactive
                                            trigger="click"
                                            placement="bottom-start"
                                            offset={[4, 4]}
                                        >
                                            <Tippy className={cx('tool-tip')} content="Lựa chọn" delay={[200, 0]}>
                                                <div>
                                                    <MoreHoriz className={cx('item')} />
                                                </div>
                                            </Tippy>
                                        </TippyHeadless>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className={cx('container-conversation')}>
                    <div className={cx('list-conversation')}>
                        {/*onClick={tam}  */}
                        <img
                            className={cx('avatar-img')}
                            src={conversation?.imageLinkOfConver ? conversation.imageLinkOfConver : images.noImg}
                            alt="avatar"
                        />

                        <div className={cx('content')}>
                            <h4 className={cx('username')}>{conversation?.name} </h4>
                            {isPhoneBook ? null : (
                                <p className={cx('message')}>{conversation?.content || conversation?.lastMessage}</p>
                            )}
                        </div>

                        {isPhoneBook && !Group ? (
                            <TippyHeadless
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <Popper className={cx('own-menu-list-children')}>
                                            <p className={cx('deleteFriend')}>
                                                <ModelInfoAccount yourProfile friend user={conversation} />
                                            </p>
                                            <p className={cx('deleteFriend')} onClick={handleCancel}>
                                                <button className={cx('item-btn')}> Xóa Bạn</button>
                                            </p>
                                        </Popper>
                                    </div>
                                )}
                                interactive
                                trigger="click"
                                placement="bottom-start"
                                offset={[4, 4]}
                            >
                                <Tippy className={cx('tool-tip')} content="Lựa chọn" delay={[200, 0]}>
                                    <div>
                                        <MoreHoriz className={cx('item')} />
                                    </div>
                                </Tippy>
                            </TippyHeadless>
                        ) : null}

                        {isPhoneBook ? null : (
                            <div className={cx('notification')}>
                                <span className={cx('time')}>{format(conversation?.time)}</span>
                                {conversationID?.id === conversation?.id ? (
                                    <>
                                        {notifications.length > 0 && (
                                            <span className={cx('badge')}>{notifications.length}</span>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>

                    {isPhoneBook ? null : (
                        <button className={cx('option-remove-conversation')}>
                            <TippyHeadless
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs} className={cx('tippy-remove-conversation')}>
                                        <Popper className={cx('popper-remove-conversation')}>
                                            <button
                                                className={cx('btn-remove')}
                                                onClick={handleDeleteConversationSingle}
                                            >
                                                Xóa cuộc hội thoại
                                            </button>
                                        </Popper>
                                    </div>
                                )}
                                delay={[0, 100]}
                                placement="bottom-end"
                                // offset={[0, 0]}
                                interactive
                            >
                                <FontAwesomeIcon className={cx('option-del')} icon={faEllipsis} />
                            </TippyHeadless>
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default Conversation;
