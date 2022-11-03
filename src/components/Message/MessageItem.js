// lib
import classNames from 'classnames/bind';
import { useState } from 'react';

// me
import styles from './Message.module.scss';
import images from '~/assets/images';
import ModelWrapper from '../ModelWrapper';
import FileMessage from '../FileMessage';

const cx = classNames.bind(styles);

function MessageItem({ message, own }) {
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
                <>
                    {/* File message */}
                    {message.fileLink ? (
                        <FileMessage message={message} />
                    ) : (
                        message.fileLink &&
                        message.content && (
                            <>
                                <p className={cx('message-top-text')}>{message.content}</p>
                                <FileMessage message={message} />
                            </>
                        )
                    )}

                    {/* Image + Video message */}
                    {message.imageLink && !message.fileLink && message.content && (
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
                    {message.imageLink && !message.fileLink && !message.content && (
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
                        message.imageLink === null &&
                        message.fileLink === null && <p className={cx('message-top-text')}>{message.content}</p>
                    )}
                </>
            ) : (
                <>
                    {/* File message */}
                    {message.fileLink ? (
                        <FileMessage message={message} />
                    ) : (
                        message.fileLink !== null &&
                        message.content && (
                            <>
                                <p className={cx('message-top-text')}>{message.content}</p>
                                <FileMessage message={message} />
                            </>
                        )
                    )}

                    {/* Image + video message */}
                    {message.imageLink && !message.fileLink && message.content && (
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
                    {message.imageLink && !message.fileLink && !message.content && (
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
                        message.imageLink === null &&
                        message.fileLink === null && <p className={cx('message-top-text')}>{message.content}</p>
                    )}
                </>
            )}
        </>
    );
}

export default MessageItem;
