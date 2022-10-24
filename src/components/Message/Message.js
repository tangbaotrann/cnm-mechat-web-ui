// libs
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import moment from 'moment';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCopy, faEllipsis, faQuoteRight, faRepeat, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Message.module.scss';
import images from '~/assets/images';
import Popper from '../Popper';
import ModelWrapper from '../ModelWrapper';

const cx = classNames.bind(styles);

function Message({ message, own, conversation, user }) {
    const [showPreview, setShowPreview] = useState(false);

    // show preview
    const handleShowPreviewImageAndVideo = () => {
        setShowPreview(!showPreview);
    };

    // hide preview
    const handleHidePreviewImageAndVideo = () => {
        setShowPreview(false);
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
                            <div>
                                {message.imageLink && message.content && (
                                    <>
                                        {message.imageLink.split('.')[message.imageLink.split('.').length - 1] ===
                                        'mp4' ? (
                                            <>
                                                <p className={cx('message-top-text')}>{message.content}</p>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        ) : (
                                            <>
                                                <p className={cx('message-top-text')}>{message.content}</p>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        )}
                                    </>
                                )}
                                {message.imageLink && !message.content && (
                                    <>
                                        {message.imageLink.split('.')[message.imageLink.split('.').length - 1] ===
                                        'mp4' ? (
                                            <>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        )}
                                    </>
                                )}
                                {message.imageLink === null && (
                                    <p className={cx('message-top-text')}>{message.content}</p>
                                )}
                            </div>
                        </TippyHeadless>
                        <img
                            className={cx('message-top-img')}
                            src={user.avatarLink ? user.avatarLink : images.noImg}
                            alt="avatar"
                        />
                    </div>
                    <span className={cx('message-bottom')}>{moment(message.createdAt).format('h:mm a')}</span>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('message-top')}>
                        <img
                            className={cx('message-top-img')}
                            src={conversation.imageLinkOfConver ? conversation.imageLinkOfConver : images.noImg}
                            alt="avatar"
                        />
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
                            <div>
                                {message.imageLink && message.content && (
                                    <>
                                        {message.imageLink.split('.')[message.imageLink.split('.').length - 1] ===
                                        'mp4' ? (
                                            <>
                                                <p className={cx('message-top-text')}>{message.content}</p>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        ) : (
                                            <>
                                                <p className={cx('message-top-text')}>{message.content}</p>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('image-send-user-left')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        )}
                                    </>
                                )}
                                {message.imageLink && !message.content && (
                                    <>
                                        {message.imageLink.split('.')[message.imageLink.split('.').length - 1] ===
                                        'mp4' ? (
                                            <>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <video
                                                        controls
                                                        className={cx('preview-image-send-user')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={cx('preview-image')}
                                                    onClick={handleShowPreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('image-send-user-left')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </button>
                                                <ModelWrapper
                                                    className={cx('model-preview')}
                                                    open={showPreview}
                                                    onClose={handleHidePreviewImageAndVideo}
                                                >
                                                    <img
                                                        className={cx('preview-image-send-user-left')}
                                                        src={message.imageLink}
                                                        alt="img"
                                                    />
                                                </ModelWrapper>
                                            </>
                                        )}
                                    </>
                                )}
                                {message.imageLink === null && (
                                    <p className={cx('message-top-text')}>{message.content}</p>
                                )}
                            </div>
                        </TippyHeadless>
                    </div>
                    <span className={cx('message-bottom-left')}>{moment(message.createdAt).format('h:mm a')}</span>
                </div>
            )}
        </>
    );
}

export default Message;
