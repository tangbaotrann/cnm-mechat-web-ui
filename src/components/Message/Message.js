// libs
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCopy, faEllipsis, faQuoteRight, faRepeat, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Message.module.scss';
import images from '~/assets/images';
import Popper from '../Popper';
import MessageItem from './MessageItem';
import { fetchApiDeleteMessage, fetchApiRecallMessage } from '~/redux/features/messages/messagesSlice';
import { fetchApiGroupUserChat } from '~/redux/features/Group/groupUserSlice';

const cx = classNames.bind(styles);

function Message({ message, own, conversation, user }) {
    const dispatch = useDispatch();

    const member = useSelector((state) => state.groupUserSlices.data);

    // console.log('member - 29 -', member);
    //console.log('[USER - 25] - ', user);
    // console.log('[message] - 25 -', message);
    // console.log('[conversation] - 26 ', conversation);
    // console.log('member ', member._id);

    // find member in group
    useEffect(() => {
        dispatch(fetchApiGroupUserChat(conversation.members.find((member) => member)));
    }, [conversation, dispatch, message.senderID]);

    // handle delete message
    const handleDeleteMessage = async () => {
        dispatch(
            fetchApiDeleteMessage({
                messageId: message._id,
                // conversationID: conversation.id,
                userId: user._id,
            }),
        );
    };

    // handle re-call message
    const handleRecallMessage = async () => {
        dispatch(
            fetchApiRecallMessage({
                messageId: message._id,
                conversationID: conversation.id,
            }),
        );
    };

    return (
        <>
            {own ? (
                <div className={cx('own')}>
                    <div className={cx('message-top')}>
                        {/* Menu parent */}
                        <TippyHeadless
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Popper className={cx('own-menu-list')}>
                                        <div className={cx('options')}>
                                            <Tippy className={cx('tool-tip')} content="Trả lời" delay={[200, 0]}>
                                                <button className={cx('option-btn')}>
                                                    <FontAwesomeIcon
                                                        className={cx('option-icon')}
                                                        icon={faQuoteRight}
                                                    />
                                                </button>
                                            </Tippy>

                                            <Tippy className={cx('tool-tip')} content="Chia sẻ" delay={[200, 0]}>
                                                <button className={cx('option-btn')}>
                                                    <FontAwesomeIcon className={cx('option-icon')} icon={faShare} />
                                                </button>
                                            </Tippy>
                                            {/* Menu children */}
                                            <TippyHeadless
                                                render={(attrs) => (
                                                    <div tabIndex="-1" {...attrs}>
                                                        <Popper className={cx('own-menu-list-children')}>
                                                            <button className={cx('options-children-copy-btn')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('copy-icon')}
                                                                    icon={faCopy}
                                                                />
                                                                Coppy tin nhắn
                                                            </button>

                                                            <div className={cx('separator')}></div>

                                                            <button
                                                                className={cx('options-children-btn')}
                                                                onClick={handleRecallMessage}
                                                            >
                                                                <FontAwesomeIcon
                                                                    className={cx('recall-icon')}
                                                                    icon={faRepeat}
                                                                />
                                                                Thu hồi
                                                            </button>
                                                            <button
                                                                className={cx('options-children-btn')}
                                                                onClick={handleDeleteMessage}
                                                            >
                                                                <FontAwesomeIcon
                                                                    className={cx('recall-icon')}
                                                                    icon={faTrash}
                                                                />
                                                                Xóa
                                                            </button>
                                                        </Popper>
                                                    </div>
                                                )}
                                                interactive
                                                trigger="click"
                                                placement="bottom-start"
                                                offset={[4, 4]}
                                            >
                                                <Tippy className={cx('tool-tip')} content="Thêm" delay={[200, 0]}>
                                                    <button className={cx('option-btn')}>
                                                        <FontAwesomeIcon
                                                            className={cx('option-icon')}
                                                            icon={faEllipsis}
                                                        />
                                                    </button>
                                                </Tippy>
                                            </TippyHeadless>
                                        </div>
                                        {/* Button like (:hover) */}
                                        <button className={cx('option-btn')}>
                                            <FontAwesomeIcon className={cx('like-icon')} icon={faThumbsUp} />
                                        </button>
                                    </Popper>
                                </div>
                            )}
                            interactive
                            placement="bottom-start"
                            offset={[-74, -18]} // 10 4
                            delay={[200, 100]}
                            appendTo={() => document.body}
                        >
                            {/* render message (sender) */}
                            {message.deleteBy.length === 0 && (
                                <div className={cx('display-group-preview-image')}>
                                    <MessageItem message={message} own={own} />
                                </div>
                            )}
                        </TippyHeadless>
                        {message.deleteBy.length === 0 && (
                            <img
                                className={cx('message-top-img')}
                                src={user.avatarLink ? user.avatarLink : images.noImg}
                                alt="avatar"
                            />
                        )}
                    </div>
                    {message.deleteBy.length === 0 && (
                        <span className={cx('message-bottom')}>{moment(message.createdAt).format('h:mm a')}</span>
                    )}
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('message-top')}>
                        {message.deleteBy.length === 0 && (
                            <img
                                className={cx('message-top-img')}
                                src={member._id === message?.senderID ? member.avatarLink : images.noImg}
                                alt="avatar"
                            />
                        )}
                        {/* Menu parent */}
                        <TippyHeadless
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Popper className={cx('own-menu-list')}>
                                        <div className={cx('options')}>
                                            <Tippy className={cx('tool-tip')} content="Trả lời" delay={[200, 0]}>
                                                <button className={cx('option-btn')}>
                                                    <FontAwesomeIcon
                                                        className={cx('option-icon')}
                                                        icon={faQuoteRight}
                                                    />
                                                </button>
                                            </Tippy>

                                            <Tippy className={cx('tool-tip')} content="Chia sẻ" delay={[200, 0]}>
                                                <button className={cx('option-btn')}>
                                                    <FontAwesomeIcon className={cx('option-icon')} icon={faShare} />
                                                </button>
                                            </Tippy>
                                            {/* Menu children */}
                                            <TippyHeadless
                                                render={(attrs) => (
                                                    <div tabIndex="-1" {...attrs}>
                                                        <Popper className={cx('own-menu-list-children')}>
                                                            <button className={cx('options-children-copy-btn')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('copy-icon')}
                                                                    icon={faCopy}
                                                                />
                                                                Coppy tin nhắn
                                                            </button>

                                                            <div className={cx('separator')}></div>

                                                            <button className={cx('options-children-btn')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('recall-icon')}
                                                                    icon={faRepeat}
                                                                />
                                                                Thu hồi
                                                            </button>
                                                            <button className={cx('options-children-btn')}>
                                                                <FontAwesomeIcon
                                                                    className={cx('recall-icon')}
                                                                    icon={faTrash}
                                                                />
                                                                Xóa
                                                            </button>
                                                        </Popper>
                                                    </div>
                                                )}
                                                interactive
                                                trigger="click"
                                                placement="bottom-start"
                                                offset={[-2, 4]}
                                            >
                                                <Tippy className={cx('tool-tip')} content="Thêm" delay={[200, 0]}>
                                                    <button className={cx('option-btn')}>
                                                        <FontAwesomeIcon
                                                            className={cx('option-icon')}
                                                            icon={faEllipsis}
                                                        />
                                                    </button>
                                                </Tippy>
                                            </TippyHeadless>
                                        </div>
                                        {/* Button like (:hover) */}
                                        <button className={cx('option-btn')}>
                                            <FontAwesomeIcon className={cx('like-icon-receiver')} icon={faThumbsUp} />
                                        </button>
                                    </Popper>
                                </div>
                            )}
                            interactive
                            placement="bottom-end"
                            offset={[74, -18]}
                            delay={[200, 100]}
                            appendTo={() => document.body}
                        >
                            {/* render message (sender) */}
                            {message.deleteBy.length === 0 && (
                                <div className={cx('display-group-preview-image-receiver')}>
                                    <MessageItem message={message} own={own} />
                                </div>
                            )}
                        </TippyHeadless>
                    </div>
                    {message.deleteBy.length === 0 && (
                        <span className={cx('message-bottom-left')}>{moment(message.createdAt).format('h:mm a')}</span>
                    )}
                </div>
            )}
        </>
    );
}

export default Message;
