// lib
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import {
    faClose,
    faFaceSmile,
    faFile,
    faImage,
    faLock,
    faPaperclip,
    faThumbsUp,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@material-ui/core';
import EmojiPicker, { SkinTones } from 'emoji-picker-react';

// me
import styles from './Messenger.module.scss';
import Message from '~/components/Message';
import Popper from '~/components/Popper';
import OnlineStatus from '~/components/OnlineStatus';
import socket from '~/util/socket';
import messagesSlice, {
    fetchApiSendMessage,
    fetchApiMessagesByConversationId,
} from '~/redux/features/messages/messagesSlice';
import PreviewFileMessage from '~/components/FileMessage/PreviewFileMessage';
import {
    userLogin,
    userInfoSelector,
    conversationSlice,
    isLoadingMessenger,
    getMessageFromUserInGroupFromSelector,
    findUserOtherInConversationSingle,
    listGroupUser,
} from '~/redux/selector';
import listGroupUsers, { blockMember, cancelBlockMember } from '~/redux/features/Group/GroupSlice';

const cx = classNames.bind(styles);

function Messenger() {
    const [newMessage, setNewMessage] = useState('');
    const [newImageMessage, setNewImageMessage] = useState([]);
    const [newFileMessage, setNewFileMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [btnClosePreview, setBtnClosePreview] = useState(false);
    const [previewEmoji, setPreviewEmoji] = useState(false);

    const dispatch = useDispatch();

    const infoUser = useSelector(userLogin);
    const userBlock = useSelector(findUserOtherInConversationSingle);
    const listMessage = useSelector(getMessageFromUserInGroupFromSelector);
    const user = useSelector(userInfoSelector);
    const conversation = useSelector(conversationSlice);
    const isLoading = useSelector(isLoadingMessenger);

    const scrollMessenger = useRef();

    // fetch message from conversationId
    useEffect(() => {
        dispatch(fetchApiMessagesByConversationId(conversation.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation.id]);

    // realtime with notification message
    useEffect(() => {
        socket.on('get_notification_message', (message) => {
            if (message) {
                dispatch(messagesSlice.actions.arrivalNotificationsMessageFromSocket(message));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // realtime with block message user in group
    useEffect(() => {
        socket.on('blocked_message_user', (arrBlocked) => {
            // console.log('[blocked_message_user]', arrBlocked);
            dispatch(listGroupUsers.actions.arrivalBlockMessageUserInGroupFromSocket(arrBlocked));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversation.id);
        socket.emit('status_user', user._id);

        socket.on('get_users', (users) => {
            // console.log('USER - ONLINE -', users);
            setOnlineUsers(conversation?.members.filter((member) => users.some((us) => us.userId === member)));
        });
    }, [user._id, conversation]);

    // realtime message of receiver
    useEffect(() => {
        socket.on('receiver_message', (message) => {
            dispatch(messagesSlice.actions.arrivalMessageFromSocket(message));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // realtime re-call message of receiver
    useEffect(() => {
        socket.on('receiver_recall_message', (message) => {
            dispatch(messagesSlice.actions.recallMessageFromSocket(message));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handle change message
    const handleChangeMessage = (e) => {
        const mess = e.target.value;

        if (!mess.startsWith(' ')) {
            setNewMessage(mess);
        }
    };

    // handle change image and preview image
    const handleChangeImageMessage = (e) => {
        const files = e.target.files;
        const listImg = [];

        [...files].forEach((file) => {
            listImg.push({
                data: file,
                preview: URL.createObjectURL(file),
            });
        });

        setNewImageMessage(listImg);
        setBtnClosePreview(!btnClosePreview);
    };

    // handle change file
    const handleChangeFileMessage = (e) => {
        const file = e.target.files[0];

        file.previewFile = URL.createObjectURL(file);

        setNewFileMessage(file);
        setBtnClosePreview(!btnClosePreview);
    };

    // cleanup func
    useEffect(() => {
        return () => {
            newImageMessage && URL.revokeObjectURL(newImageMessage.preview);
        };
    }, [newImageMessage]);

    useEffect(() => {
        return () => {
            newFileMessage && URL.revokeObjectURL(newFileMessage.previewFile);
        };
    }, [newFileMessage]);

    // handle preview emoji
    const handlePreviewEmoji = () => {
        setPreviewEmoji(true);
    };

    const handleEmojiClicked = (emojiObj, e) => {
        let emojis = emojiObj.emoji;
        const _message = [...newMessage, emojis];

        setNewMessage(_message.join(''));
    };

    // handle button send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        dispatch(
            fetchApiSendMessage({
                conversationID: conversation.id,
                senderID: user._id,
                content: newMessage.emoji ? newMessage.emoji : newMessage,
                imageLinks: newImageMessage,
                fileLink: newFileMessage,
            }),
        );

        setNewMessage('');
        setNewImageMessage([]);
        setNewFileMessage(null);
        setBtnClosePreview(false);
    };

    // handle close preview
    const handleClosePreview = () => {
        setNewImageMessage([]);
        setNewFileMessage(null);
        setBtnClosePreview(false);
    };

    // scroll messenger
    useEffect(() => {
        conversation && listMessage && scrollMessenger.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation, listMessage]);

    // handle blocked message user
    const handleBlockedSingle = () => {
        let choice = window.confirm(`Bạn có chắc chắn muốn chặn tin nhắn của ${conversation.name} không?`);

        if (choice === true) {
            const data = {
                conversationId: conversation.id,
                userId: userBlock.find((block) => block !== user._id), // userBlock
            };

            dispatch(blockMember(data));

            if (blockMember()) {
                alert('Bạn đã chặn tin nhắn thành công.');
            }
        } else {
            alert('Bạn đã hủy chặn tin nhắn thành công.');
        }
    };

    // handle un-blocked message user
    const handleUnBlockedSingle = () => {
        let choice = window.confirm(`Bạn có chắc chắn muốn bỏ chặn tin nhắn của ${conversation.name} không?`);

        if (choice === true) {
            const data = {
                conversationId: conversation.id,
                userId: userBlock.find((block) => block !== user._id),
            };

            dispatch(cancelBlockMember(data));

            if (cancelBlockMember()) {
                alert('Bạn đã bỏ chặn tin nhắn thành công.');
            }
        } else {
            alert('Bạn đã hủy chặn tin nhắn thành công.');
        }
    };

    return (
        <div className={cx('messenger')}>
            <div className={cx('messenger-header')}>
                {/* Online user (status) */}
                <OnlineStatus onlineUsers={onlineUsers} conversation={conversation} />

                <div>
                    <Tippy className={cx('tool-tip')} content="Cuộc gọi video" delay={[200, 0]}>
                        <button className={cx('btn-click-icon')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
                        </button>
                    </Tippy>

                    {/* block single */}
                    {conversation.isGroup ? null : (
                        <>
                            {conversation?.blockBy?.includes(userBlock.find((block) => block !== user._id)) ? (
                                <button className={cx('un-blocked-single')} onClick={handleUnBlockedSingle}>
                                    Bỏ chặn
                                </button>
                            ) : (
                                <Tippy
                                    className={cx('tool-tip')}
                                    content={`Chặn tin nhắn của ${conversation.name}`}
                                    delay={[200, 0]}
                                >
                                    <button className={cx('blocked-single')} onClick={handleBlockedSingle}>
                                        <FontAwesomeIcon icon={faLock} />
                                    </button>
                                </Tippy>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* onScroll={handleLoadingMessagesLast} */}
            <div className={cx('messenger-body')}>
                {/* Messages */}
                {isLoading ? (
                    <CircularProgress className={cx('loading-messages')} />
                ) : (
                    <>
                        {listMessage.map((message) => {
                            return (
                                <div key={message?._id} ref={scrollMessenger}>
                                    <Message
                                        message={message}
                                        own={message?.senderID === user?._id}
                                        conversation={conversation}
                                        // user={user}
                                    />
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Message conversation */}
            {conversation?.blockBy?.includes(infoUser._id) ? (
                <div className={cx('Block')}>
                    <h2>Bạn đã bị chặn nhắn tin...</h2>
                </div>
            ) : (
                <>
                    <div className={cx('messenger-footer')}>
                        <div className={cx('toolbar-on-chat-input')}>
                            {/* option image */}
                            <label htmlFor="file">
                                <div className={cx('option-image-icon')}>
                                    <Tippy
                                        className={cx('tool-tip')}
                                        content="Gửi hình ảnh hoặc video"
                                        delay={[200, 0]}
                                    >
                                        <FontAwesomeIcon className={cx('option-icon')} icon={faImage} />
                                    </Tippy>
                                    <input
                                        className={cx('hide')}
                                        type="file"
                                        id="file"
                                        accept=".png, .jpg, .jpeg, .mov, .mp4"
                                        onChange={handleChangeImageMessage}
                                        multiple
                                    />
                                </div>
                            </label>
                            {/* option file */}
                            <TippyHeadless
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        {/* Sub menu option footer */}
                                        <Popper className={cx('menu-option-file')}>
                                            <>
                                                <label htmlFor="files">
                                                    <div className={cx('option-file-btn-fix')}>
                                                        <FontAwesomeIcon
                                                            className={cx('sub-menu-icon-footer')}
                                                            icon={faFile}
                                                        />
                                                        Chọn File
                                                        <input
                                                            className={cx('hide')}
                                                            type="file"
                                                            id="files"
                                                            accept=".docx, .pptx, .pdf, .xlsx"
                                                            onChange={handleChangeFileMessage}
                                                        />
                                                    </div>
                                                </label>
                                                <button className={cx('option-file-btn')}>
                                                    <FontAwesomeIcon
                                                        className={cx('sub-menu-icon-footer')}
                                                        icon={faGoogleDrive}
                                                    />
                                                    Gửi File từ Google Driver
                                                </button>
                                            </>
                                        </Popper>
                                    </div>
                                )}
                                delay={[0, 100]}
                                placement="top-start"
                                trigger="click"
                                interactive
                            >
                                <Tippy className={cx('tool-tip')} content="Đính kèm File" delay={[200, 0]}>
                                    <div className={cx('option-file-icon')}>
                                        <FontAwesomeIcon className={cx('option-icon')} icon={faPaperclip} />
                                    </div>
                                </Tippy>
                            </TippyHeadless>
                        </div>
                        <div className={cx('message-container')}>
                            {/* Input message */}
                            {/* const blockMembers = useSelector(filterBlockMembers); infoUser */}
                            {/*  ? ( */}

                            <textarea
                                className={cx('message-input')}
                                value={
                                    newMessage && newMessage.emoji?.join('')
                                        ? newMessage && newMessage.emoji?.join('')
                                        : newMessage.emoji?.join('')
                                        ? newMessage.emoji?.join('')
                                        : newMessage
                                }
                                onChange={handleChangeMessage}
                                placeholder="Nhập tin nhắn ..."
                            ></textarea>

                            {/* Preview emoji */}
                            <TippyHeadless
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <Popper>
                                            {previewEmoji && (
                                                <div className={cx('display-preview-emoji')}>
                                                    <EmojiPicker
                                                        onEmojiClick={handleEmojiClicked}
                                                        defaultSkinTone={SkinTones}
                                                        width={300}
                                                    />
                                                </div>
                                            )}
                                        </Popper>
                                    </div>
                                )}
                                delay={[0, 100]}
                                trigger="click"
                                interactive
                                appendTo={document.body}
                            >
                                <button className={cx('preview-emoji')} onClick={handlePreviewEmoji}>
                                    <Tippy className={cx('tool-tip')} content="Biểu cảm" delay={[200, 0]}>
                                        <FontAwesomeIcon className={cx('icon-right')} icon={faFaceSmile} />
                                    </Tippy>
                                </button>
                            </TippyHeadless>
                            {/* Button send message || chosenEmoji*/}
                            {newMessage || newImageMessage.length !== 0 || newFileMessage ? (
                                <button className={cx('send-message-btn')} onClick={handleSendMessage}>
                                    GỬI
                                </button>
                            ) : (
                                <Tippy
                                    className={cx('tool-tip')}
                                    content="Gửi nhanh biểu tượng cảm xúc"
                                    delay={[200, 0]}
                                >
                                    <button className={cx('send-message-like')}>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </button>
                                </Tippy>
                            )}
                        </div>
                        {/* Preview upload Image and Video */}
                        <div className={cx('preview-upload')}>
                            {btnClosePreview && (
                                <button className={cx('close-btn')} onClick={handleClosePreview}>
                                    <FontAwesomeIcon icon={faClose} className={cx('close-icon')} />
                                </button>
                            )}

                            {newImageMessage.length > 0 ? (
                                <div>
                                    {newImageMessage.map((img, index) => {
                                        return (
                                            <>
                                                {img.data.name.split('.')[img.data.name.split('.').length - 1] ===
                                                'mp4' ? (
                                                    <video
                                                        className={cx('image-upload')}
                                                        key={index}
                                                        src={img.preview}
                                                        alt="video"
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        className={cx('image-upload')}
                                                        key={index}
                                                        src={img.preview}
                                                        alt="preview-img"
                                                    />
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                            ) : null}

                            {/* file message */}
                            {newFileMessage && <PreviewFileMessage newFileMessage={newFileMessage} />}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Messenger;
