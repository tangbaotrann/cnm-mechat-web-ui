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
import { fetchApiMessagesByConversationId } from '~/redux/features/messages/messagesSlice';
import { ArrowBackIos, ArrowLeft } from '@material-ui/icons';

const cx = classNames.bind(styles);

function ConversationInfo() {
    const conversation = useSelector((state) => state.conversations.conversationClick);
    const listMessage = useSelector((state) => state.messages.data);
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchApiMessagesByConversationId(conversation.id));
    // }, [conversation.id, dispatch]);
    const handleOpen = () => {
        setShow(false);
        console.log(show);
    };
    const handleClose = () => {
        setShow(true);
        console.log(show);
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
                                <img
                                    className={cx('avatar')}
                                    src={
                                        conversation?.imageLinkOfConver ? conversation.imageLinkOfConver : images.noImg
                                    }
                                    alt="avatar"
                                />
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
                                                {message.imageLink ? (
                                                    <>
                                                        {message.imageLink.split('.')[
                                                            message.imageLink.split('.').length - 1
                                                        ] === 'mp4' ? (
                                                            <video
                                                                controls
                                                                className={cx('item-image')}
                                                                src={message.imageLink}
                                                                alt="img"
                                                            />
                                                        ) : (
                                                            <>
                                                                <img
                                                                    className={cx('item-image')}
                                                                    src={message.imageLink ? message.imageLink : null}
                                                                    alt="avatar"
                                                                />
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
                                <button className={cx('footer-btn-all')} onClick={handleOpen}>
                                    Xem tất cả
                                </button>
                            </div>
                        </div>

                        <div className={cx('separator')}></div>
                        {/* File */}
                        <ItemStored />

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

                    <div className={cx('info-show')}>
                        <label className={cx('info-show-1')}>Ảnh/ Video </label>
                        <label className={cx('info-show-2')}>Files</label>
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
                                                            <img
                                                                className={cx('item-image-show')}
                                                                src={message.imageLink ? message.imageLink : null}
                                                                alt="avatar"
                                                            />
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
                </div>
            )}
        </div>
    );
}

export default ConversationInfo;
