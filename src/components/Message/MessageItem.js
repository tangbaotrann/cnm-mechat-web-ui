// lib
import classNames from 'classnames/bind';
import { useState } from 'react';

// me
import styles from './Message.module.scss';
import ModelWrapper from '../ModelWrapper';

const cx = classNames.bind(styles);

function MessageItem({ message, own }) {
    const [showPreview, setShowPreview] = useState(false);

    // console.log('MESSAGE - ', message);

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
                <>
                    {message.imageLink && message.content && (
                        <>
                            {message.imageLink.split('.')[message.imageLink.split('.').length - 1] === 'mp4' ? (
                                <>
                                    <p className={cx('message-top-text')}>{message.content}</p>
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
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
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
                                        <img className={cx('image-send-user')} src={message.imageLink} alt="img" />
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
                            {message.imageLink.split('.')[message.imageLink.split('.').length - 1] === 'mp4' ? (
                                <>
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
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
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
                                        <img className={cx('image-send-user')} src={message.imageLink} alt="img" />
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
                    {message.action ? (
                        <p className={cx('message-top-text')}>{message.action}</p>
                    ) : (
                        message.imageLink === null && <p className={cx('message-top-text')}>{message.content}</p>
                    )}
                </>
            ) : (
                <>
                    {message.imageLink && message.content && (
                        <>
                            {message.imageLink.split('.')[message.imageLink.split('.').length - 1] === 'mp4' ? (
                                <>
                                    <p className={cx('message-top-text')}>{message.content}</p>
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
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
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
                                        <img className={cx('image-send-user-left')} src={message.imageLink} alt="img" />
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
                            {message.imageLink.split('.')[message.imageLink.split('.').length - 1] === 'mp4' ? (
                                <>
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
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
                                    <button className={cx('preview-image')} onClick={handleShowPreviewImageAndVideo}>
                                        <img className={cx('image-send-user-left')} src={message.imageLink} alt="img" />
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
                    {message.action ? (
                        <p className={cx('message-top-text')}>{message.action}</p>
                    ) : (
                        message.imageLink === null && <p className={cx('message-top-text')}>{message.content}</p>
                    )}
                </>
            )}
        </>
    );
}

export default MessageItem;
