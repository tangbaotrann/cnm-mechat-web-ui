// libs
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './ConversationInfo.module.scss';
import images from '~/assets/images';
import ItemStored from '~/components/ItemStored';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ArrowBackIos } from '@material-ui/icons';
import FileMessage from '~/components/FileMessage';
import { userLogin } from '~/redux/selector';
import useDebounce from '~/components/hooks/useDebounce';
import ModelInfoAccount from '~/components/ModelWrapper/ModelInfoAccount';
import { infoUserConversation } from '~/redux/features/user/userCurrent';
import ModelWrapper from '~/components/ModelWrapper';

const cx = classNames.bind(styles);

function ConversationInfo() {
    const conversation = useSelector((state) => state.conversations.conversationClick);
    const listMessage = useSelector((state) => state.messages.data);
    const [show, setShow] = useState(true);
    const [showFile, setShowFile] = useState(true);
    const infoUser = useSelector(userLogin);
    const userCurrent = useSelector((state) => state.userCurrents.data);
    const [showPreview, setShowPreview] = useState(false);
    const [showImg, setShowImg] = useState();
    const infoConversation =
        infoUser._id === conversation.members[0] ? conversation.members[1] : conversation.members[0];
    const debouncedValue = useDebounce(infoConversation, 500);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            infoUserConversation({
                userID: infoConversation,
            }),
        );
    }, [debouncedValue]);

    const handleOpen = () => {
        setShow(false);
        setShowFile(true);
    };
    const handleClose = () => {
        setShow(true);
        console.log(show);
    };

    //file
    const handleOpenFile = () => {
        setShow(false);
        setShowFile(false);
    };
    const handleShowPreviewImageAndVideo = (e) => {
        setShowPreview(!showPreview);
        console.log(e.target);
        setShowImg(e.target.src);
    };

    // hide preview
    const handleHidePreviewImageAndVideo = () => {
        setShowPreview(false);
    };

    return (
        <div className={cx('wrapper')}>
            {show ? (
                <>
                    <div className={cx('container')}>
                        <h2 className={cx('title-name')}>Thông tin hội thoại</h2>
                        <div className={cx('separator')}></div>

                        <div className={cx('info')}>
                            <div className={cx('info-avatar')}>
                                {/* <img
                                    className={cx('avatar')}
                                    src={
                                        conversation?.imageLinkOfConver ? conversation.imageLinkOfConver : images.noImg
                                    }
                                    alt="avatar"
                                /> */}
                                <div className={cx('avatar')}>
                                    <ModelInfoAccount ConversationInfo user={userCurrent} />
                                </div>
                            </div>
                            <div className={cx('info-name')}>
                                <h3 className={cx('name')}>{conversation?.name}</h3>
                            </div>
                        </div>

                        <div className={cx('separator')}></div>

                        {/* Image and Video */}
                        <div className={cx('list-image')}>
                            <div className={cx('header')}>
                                <span className={cx('header-title')}>Ảnh/ Video</span>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                            </div>
                            <div className={cx('body')}>
                                {/* render image (map) after */}
                                <div className={cx('body-list-image')}>
                                    {listMessage.map((message) => {
                                        return (
                                            <div key={message._id}>
                                                {message.imageLink && message.imageLink.length > 0 ? (
                                                    <>
                                                        {message.imageLink[0].split('.')[
                                                            message.imageLink[0].split('.').length - 1
                                                        ] === 'mp4' ? (
                                                            <video
                                                                controls
                                                                className={cx('item-image')}
                                                                src={message.imageLink}
                                                                alt="img"
                                                            />
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className={cx('button-image')}
                                                                    onClick={handleShowPreviewImageAndVideo}
                                                                >
                                                                    <img
                                                                        className={cx('item-image')}
                                                                        src={message.imageLink}
                                                                        alt="avatar"
                                                                        id="file-upload"
                                                                    />
                                                                </button>

                                                                <ModelWrapper
                                                                    className={cx('model-preview')}
                                                                    open={showPreview}
                                                                    onClose={handleHidePreviewImageAndVideo}
                                                                >
                                                                    <img
                                                                        className={cx('preview-image-send-user')}
                                                                        src={showImg}
                                                                        alt="img"
                                                                    />
                                                                </ModelWrapper>
                                                            </>
                                                        )}
                                                    </>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={cx('footer')}>
                                <button className={cx('footer-btn-all')} onClick={handleOpen}>
                                    Xem tất cả
                                </button>
                            </div>
                        </div>

                        <div className={cx('separator')}></div>
                        {/* ------------------------------------------------------ */}
                        <div className={cx('list-item-stored')}>
                            <div className={cx('header')}>
                                <span className={cx('header-title')}>File</span>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                            </div>
                            <div className={cx('body')}>
                                {/* render image (map) after */}
                                <div className={cx('body-list-item-stored')}>
                                    <div className={cx('right-container')}>
                                        {listMessage.map((message) => {
                                            return (
                                                <div key={message._id}>
                                                    {message.fileLink ? (
                                                        <FileMessage message={message} className={cx('file')} />
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className={cx('footer')}>
                                <button className={cx('footer-btn-all')} onClick={handleOpenFile}>
                                    Xem tất cả
                                </button>
                            </div>
                        </div>

                        {/* --------------------------------------------------------- */}
                        <div className={cx('separator')}></div>
                        {/* Link */}
                        <ItemStored isLink />
                    </div>
                </>
            ) : (
                <div className={cx('container')}>
                    <h2 className={cx('title-name-show')}>
                        <ArrowBackIos className={cx('item-back')} onClick={handleClose} />
                        <p>Kho lưu trữ</p>
                    </h2>
                    <div className={cx('separator')}></div>
                    {showFile ? (
                        <>
                            <div className={cx('info-show')}>
                                <label className={cx('info-show-1')} onClick={handleOpen} style={{ color: 'blue' }}>
                                    Ảnh/ Video{' '}
                                </label>
                                <label className={cx('info-show-2')} onClick={handleOpenFile}>
                                    Files
                                </label>
                                <label className={cx('info-show-3')}>Links</label>
                            </div>
                            <div className={cx('separator')}></div>
                            <div className={cx('list-image')}>
                                <div className={cx('body-show')}>
                                    {/* render image (map) after */}
                                    <div className={cx('body-list-image-show')}>
                                        {listMessage.map((message) => {
                                            return (
                                                <div key={message._id}>
                                                    {message.imageLink ? (
                                                        <>
                                                            {message.imageLink.split('.')[
                                                                message.imageLink.split('.').length - 1
                                                            ] === 'mp4' ? (
                                                                <video
                                                                    controls
                                                                    className={cx('item-image-show')}
                                                                    src={message.imageLink}
                                                                    alt="img"
                                                                />
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        className={cx('button-image')}
                                                                        onClick={handleShowPreviewImageAndVideo}
                                                                    >
                                                                        <img
                                                                            className={cx('item-image-show')}
                                                                            src={message.imageLink}
                                                                            alt="avatar"
                                                                            id="file-upload"
                                                                        />
                                                                    </button>

                                                                    <ModelWrapper
                                                                        className={cx('model-preview')}
                                                                        open={showPreview}
                                                                        onClose={handleHidePreviewImageAndVideo}
                                                                    >
                                                                        <img
                                                                            className={cx('preview-image-send-user')}
                                                                            src={showImg}
                                                                            alt="img"
                                                                        />
                                                                    </ModelWrapper>
                                                                </>
                                                            )}{' '}
                                                        </>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={cx('footer')}>
                                    <button className={cx('footer-btn-all')} onClick={handleClose}>
                                        Thu gọn
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {' '}
                            <div className={cx('info-show')}>
                                <label className={cx('info-show-1')} onClick={handleOpen}>
                                    Ảnh/ Video{' '}
                                </label>
                                <label className={cx('info-show-2')} style={{ color: 'blue' }} onClick={handleOpenFile}>
                                    Files
                                </label>
                                <label className={cx('info-show-3')}>Links</label>
                            </div>
                            <div className={cx('separator')}></div>
                            <div className={cx('body')}>
                                {/* render image (map) after */}
                                <div className={cx('body-list-item-stored')}>
                                    <div className={cx('right-container')}>
                                        {listMessage.map((message) => {
                                            return (
                                                <div key={message._id}>
                                                    {message.fileLink ? (
                                                        <FileMessage message={message} className={cx('file')} />
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ConversationInfo;
