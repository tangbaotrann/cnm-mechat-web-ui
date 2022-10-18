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
    faFaceSmile,
    faFile,
    faImage,
    faPaperclip,
    faThumbsUp,
    faUserGroup,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';

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

const cx = classNames.bind(styles);

function Messenger() {
    const [newMessage, setNewMessage] = useState('');
    const [newImageMessage, setNewImageMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.data);
    const conversation = useSelector((state) => state.conversations.conversationClick);
    const listMessage = useSelector((state) => state.messages.data);

    const scrollMessenger = useRef();

    // fetch message from conversationId
    useEffect(() => {
        dispatch(fetchApiMessagesByConversationId(conversation.id));
    }, [conversation.id, dispatch]);

    // user join room
    useEffect(() => {
        socket.emit('join_room', conversation.id);

        socket.on('get_users', (users) => {
            console.log('USER - ONLINE -', users);
            setOnlineUsers(conversation?.members.filter((member) => users.some((us) => us.userId === member)));
        });
    }, [user._id, conversation]);

    // realtime message of receiver
    useEffect(() => {
        socket.on('receiver_message', (message) => {
            dispatch(messagesSlice.actions.arrivalMessageFromSocket(message));
        });
    }, [dispatch]);

    // handle change message
    const handleChangeMessage = (e) => {
        const mess = e.target.value;

        if (!mess.startsWith(' ')) {
            setNewMessage(mess);
        }
    };

    // handle change image and preview image
    const handleChangeImageMessage = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setNewImageMessage(file);
    };

    // cleanup func
    useEffect(() => {
        return () => {
            newImageMessage && URL.revokeObjectURL(newImageMessage.preview);
        };
    }, [newImageMessage]);

    // handle button send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        dispatch(
            fetchApiSendMessage({
                conversationID: conversation.id,
                senderID: user._id,
                content: newMessage,
                imageLink: newImageMessage,
            }),
        );

        setNewMessage('');
        setNewImageMessage(null);
    };

    // scroll messenger
    useEffect(() => {
        conversation && scrollMessenger.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

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
                    <Tippy className={cx('tool-tip')} content="Thêm bạn vào trò chuyện" delay={[200, 0]}>
                        <button className={cx('btn-click-icon')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faUserGroup} />
                        </button>
                    </Tippy>
                </div>
            </div>

            <div className={cx('messenger-body')}>
                {/* Messages */}
                {listMessage.map((message) => {
                    return (
                        <div key={message._id} ref={scrollMessenger}>
                            <Message
                                message={message}
                                own={message.senderID === user._id}
                                conversation={conversation}
                                user={user}
                            />
                        </div>
                    );
                })}
            </div>

            <div className={cx('messenger-footer')}>
                <div className={cx('toolbar-on-chat-input')}>
                    {/* option image */}
                    <label htmlFor="file">
                        <div className={cx('option-image-icon')}>
                            <Tippy className={cx('tool-tip')} content="Gửi hình ảnh hoặc video" delay={[200, 0]}>
                                <FontAwesomeIcon className={cx('option-icon')} icon={faImage} />
                            </Tippy>
                            <input
                                className={cx('hide')}
                                type="file"
                                id="file"
                                accept=".png, .jpg, .jpeg, .mov, .mp4"
                                onChange={handleChangeImageMessage}
                            />
                        </div>
                        {newImageMessage?.preview && (
                            <img className={cx('image-upload')} src={newImageMessage.preview} alt="img" />
                        )}
                    </label>
                    {/* option file */}
                    <TippyHeadless
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                {/* Sub menu option footer */}
                                <Popper className={cx('menu-option-file')}>
                                    <>
                                        <label htmlFor="file">
                                            <div className={cx('option-file-btn-fix')}>
                                                <FontAwesomeIcon className={cx('sub-menu-icon-footer')} icon={faFile} />
                                                Chọn File
                                                <input
                                                    className={cx('hide')}
                                                    type="file"
                                                    id="file"
                                                    accept=".png, .jpg, .jpeg"
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
                {/* Message */}
                <div className={cx('message-container')}>
                    {/* Input message */}
                    <textarea
                        className={cx('message-input')}
                        value={newMessage}
                        onChange={handleChangeMessage}
                        placeholder="Nhập tin nhắn ..."
                    ></textarea>

                    <Tippy className={cx('tool-tip')} content="Biểu cảm" delay={[200, 0]}>
                        <FontAwesomeIcon className={cx('icon-right')} icon={faFaceSmile} />
                    </Tippy>
                    {/* Button send message */}
                    {newMessage || newImageMessage ? (
                        <button className={cx('send-message-btn')} onClick={handleSendMessage}>
                            GỬI
                        </button>
                    ) : (
                        <Tippy className={cx('tool-tip')} content="Gửi nhanh biểu tượng cảm xúc" delay={[200, 0]}>
                            <button className={cx('send-message-like')}>
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                        </Tippy>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Messenger;
