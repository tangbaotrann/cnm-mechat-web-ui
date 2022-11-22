// libs
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';
// me
import styles from './Conversation.module.scss';
import images from '~/assets/images';
import { MoreHoriz } from '@material-ui/icons';
import { filterFriendGroup, filterLeader, userLogin } from '~/redux/selector';
import Popper from '../Popper';
import { friendDelete } from '~/redux/features/friend/friendAcceptSlice';
import ModelInfoAccount from '../ModelWrapper/ModelInfoAccount';
import { useEffect, useState } from 'react';
import conversationSlice from '~/redux/features/conversation/conversationSlice';
import listGroupUsers, {
    blockMember,
    cancelBlockMember,
    changeLearder,
    deleteConversation,
    deleteMember,
    fetchApiConversationById,
    listGroupUser,
    outGroup,
} from '~/redux/features/Group/GroupSlice';
import { faKey, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { friendRequests } from '~/redux/features/friend/friendRequestSlice';
import { infoUserConversation } from '~/redux/features/user/userCurrent';

const cx = classNames.bind(styles);

function Conversation({ conversation, isPhoneBook, Group, conversationInfo }) {
    const infoUser = useSelector(userLogin);

    const user = useSelector((state) => state.user.data);
    const filterLeaders = useSelector(filterLeader);
    const listFriendFilters = useSelector(filterFriendGroup);
    const [Friend, setFriend] = useState(false);

    const dispatch = useDispatch();

    const conversationID = useSelector((state) => state.listGroupUser.conversationClick); // state.conversations.conversationClick
    const conversations = useSelector((state) => state.listGroupUser.data);

    // console.log('[INFO-USER]', infoUser);
    // console.log('[USER]', user);
    // console.log('[CONVERSION]', conversation);

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
        let deletes = window.confirm('Bạn có chắc chắn muốn sửa không?');
        if (deletes === true) {
            const data = {
                idUser: infoUser._id,
                status: true,
                userDeleteId: conversation._id,
            };
            dispatch(friendDelete(data));
            alert('Xóa bạn thành công');
        } else {
            alert('bạn đã hủy yêu cầu xóa bạn');
        }
    };

    //
    const tam = () => {
        conversations.map((c) => {
            if (c.members.includes(conversation._id)) {
                if (c.isGroup === false) {
                    return dispatch(conversationSlice.actions.clickConversation(c));
                }
            }
        });
    };

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
                window.location.reload(true);
            }
        } else {
            alert('bạn đã hủy yêu cầu giải tán nhóm');
        }
    };
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
    const handleChangeLeader = () => {
        let checkOutGroup = window.confirm('Bạn có chắc chắn muốn chuyển quyền trưởng nhóm không?');
        if (checkOutGroup === true) {
            const data = {
                conversationId: conversationID.id,
                userId: conversation._id,
            };
            dispatch(changeLearder(data));
            if (changeLearder()) {
                alert('Bạn đã chuyển quyền trưởng nhóm');
            }
        } else {
            alert('bạn đã hủy yêu cầu chuyển quyền trưởng nhóm');
        }
    };

    return (
        <>
            {conversationInfo ? (
                <div className={cx('list-conversation')} onClick={handleSeeninfoInGroup}>
                    <img
                        className={cx('avatar-img')}
                        src={conversation?.imageLinkOfConver ? conversation?.imageLinkOfConver : images.noImg}
                        alt="avatar"
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
                            <Tippy className={cx('tool-tip')} content="" delay={[200, 0]}>
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
                                                <p className={cx('deleteFriend')} onClick={handleChangeLeader}>
                                                    <button className={cx('item-btn')}>Chuyển quyền trưởng Nhóm</button>
                                                </p>
                                                {conversationID.blockBy.includes(conversation._id) ? (
                                                    <p className={cx('deleteFriend')} onClick={handleCancelBlockMember}>
                                                        <button className={cx('item-btn')}>Bỏ chặn</button>
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
                                    <Tippy className={cx('tool-tip')} content="" delay={[200, 0]}>
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
                                            <Tippy className={cx('tool-tip')} content="" delay={[200, 0]}>
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
                <div className={cx('list-conversation')} onClick={tam}>
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
                            <Tippy className={cx('tool-tip')} content="" delay={[200, 0]}>
                                <div>
                                    <MoreHoriz className={cx('item')} />
                                </div>
                            </Tippy>
                        </TippyHeadless>
                    ) : null}
                    {isPhoneBook ? null : (
                        <div className={cx('notification')}>
                            <span className={cx('time')}>{format(conversation?.time)}</span>
                            {/* <span className={cx('badge')}>5+</span> */}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Conversation;
