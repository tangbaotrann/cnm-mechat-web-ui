// libs
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Messenger.module.scss';
import images from '~/assets/images';
import Message from '~/components/Message';

const cx = classNames.bind(styles);

function Messenger() {
    // const [username, setUsername] = useState('');
    // const [user, setUser] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    console.log('message - ', newMessage);
    console.log('socket - ', socket);

    // socket client
    useEffect(() => {
        setSocket(io('http://localhost:8900'));
    }, []);

    // handle button send message
    const handleSendMessage = (e) => {
        e.preventDefault();

        setMessages(newMessage);
    };

    console.log(messages);

    return (
        <div className={cx('messenger')}>
            <div className={cx('messenger-header')}>
                <img className={cx('avatar-image')} src={images.noImg} alt="" />
                <div className={cx('info')}>
                    <h3 className={cx('username')}>Nhựt Hào</h3>
                    <span className={cx('time-online')}>Truy cập 20 phút trước</span>
                </div>
                <div>
                    <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
                    <FontAwesomeIcon className={cx('icon')} icon={faUserGroup} />
                </div>
            </div>

            <div className={cx('messenger-body')}>
                <Message />
                <Message own />
                <Message />
            </div>

            <div className={cx('messenger-footer')}>
                <textarea
                    className={cx('message-input')}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn ..."
                ></textarea>
                <button className={cx('send-btn')} onClick={handleSendMessage}>
                    Gửi
                </button>
            </div>
        </div>
    );
}

export default Messenger;
