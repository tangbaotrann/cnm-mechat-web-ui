// libs
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
// import { io } from 'socket.io-client';
import TippyHeadless from '@tippyjs/react/headless';
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
import images from '~/assets/images';
import Message from '~/components/Message';
import Popper from '~/components/Popper';

const cx = classNames.bind(styles);

function Messenger() {
    const [newMessage, setNewMessage] = useState('');

    // Handle message
    const handleChangeMessage = (e) => {
        const messageValue = e.target.value;

        // Check no space first
        if (!messageValue.startsWith(' ')) {
            setNewMessage(messageValue);
        }
    };

    return (
        <div className={cx('messenger')}>
            <div className={cx('messenger-header')}>
                <img className={cx('avatar-image')} src={images.noImg} alt="" />
                <div className={cx('info')}>
                    <h3 className={cx('username')}>Nhựt Hào</h3>
                    <span className={cx('time-online')}>Truy cập 20 phút trước</span>
                </div>
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
                <Message />
                <Message own />
                <Message />
                <Message own />
                <Message />
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
                        <button className={cx('send-message-btn')}>GỬI</button>
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
