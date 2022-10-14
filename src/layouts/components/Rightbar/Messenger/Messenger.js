// libs
import classNames from 'classnames/bind';
import axios from 'axios';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
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
import messagesSlice from '~/redux/features/messages/messagesSlice';

const cx = classNames.bind(styles);

function Messenger() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const conversation = useSelector((state) => state.conversations.conversationClick);
    const user = useSelector((state) => state.user.data);

    const scrollMessenger = useRef();
    const socket = useRef();

    const dispatch = useDispatch();

    // console.log('ONLINE USER - ', onlineUsers);
    // console.log('Messenger - Messenger', messages);
    // console.log('conversation - messenger ', conversation);

    // console.log('USER - ', user);
    console.log('MESSAGES - ', messages);
    // console.log('USER - ', user);

    // fetch server socket
    useEffect(() => {
        // socket.current = io(process.env.REACT_APP_SOCKET, {
        //     // transports: ['websocket', 'polling'],
        //     withCredentials: true,
        // });
        // socket.current = io('ws://localhost:8900');
        socket.current = io('https://c498-113-22-34-182.ap.ngrok.io');

        // get message
        socket.current.on('getMessage', (data) => {
            // console.log('LOGG - ', data);
            setArrivalMessage({
                senderID: data.senderID,
                content: data.content,
                createdAt: Date.now(),
            });
        });
    }, []);

    // handle socket io
    useEffect(() => {
        socket.current.emit('addUser', user._id);

        socket.current.on('getUsers', (users) => {
            console.log('USER - ONLINE -', users);
            setOnlineUsers(conversation?.members.filter((member) => users.some((us) => us.userId === member)));
        });
    }, [user, conversation]);

    // handle get message (senderId, content)
    useEffect(() => {
        arrivalMessage &&
            conversation?.members.includes(arrivalMessage.senderID) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, conversation]);

    // fetch message from conversationId
    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (conversation !== null) {
                    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/${conversation.id}`);
                    // console.log('RES - ', res.data);
                    setMessages(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, [conversation]);

    // Handle change message
    const handleChangeMessage = (e) => {
        setNewMessage(e.target.value);
    };

    // Handle button send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        const message = {
            conversationID: conversation.id,
            senderID: user._id,
            content: newMessage,
        };

        const receiverID = conversation?.members.find((member) => member !== user._id);

        console.log('receiverID', receiverID);

        // send message with socket
        socket.current.emit('sendMessage', {
            senderID: user._id,
            receiverID: receiverID,
            content: newMessage,
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}messages`, message);
            // console.log('RES - ', res.data);
            setMessages([...messages, res.data]);

            dispatch(messagesSlice.actions.addMessages(res.data));

            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    // scroll messenger
    useEffect(() => {
        conversation && scrollMessenger.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation, messages]);

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
                {messages.map((message) => {
                    return (
                        <div key={message._id} ref={scrollMessenger}>
                            <Message
                                message={message}
                                own={message.senderID === user._id}
                                conversation={conversation}
                                user={user}
                                socket={socket}
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
                            <Tippy className={cx('tool-tip')} content="Gửi hình ảnh" delay={[200, 0]}>
                                <FontAwesomeIcon className={cx('option-icon')} icon={faImage} />
                            </Tippy>
                            <input className={cx('hide')} type="file" id="file" accept=".png, .jpg, .jpeg" />
                        </div>
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
                    {newMessage ? (
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
