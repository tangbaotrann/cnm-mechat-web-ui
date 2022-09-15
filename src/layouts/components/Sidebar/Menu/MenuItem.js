// libs
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGear,
    faUser,
    faFloppyDisk,
    faAngleRight,
    faGlobe,
    faCircleInfo,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Menu.module.scss';
import Popper from '~/components/Popper';

const cx = classNames.bind(styles);

function MenuItem() {
    const [open, setOpen] = useState(false);

    // Handle open/ close model intro
    const handleModelIntroOpen = () => {
        setOpen(true);
    };
    const handleModelIntroClose = () => {
        setOpen(false);
    };

    // Menu popper sub language
    const renderMenuPopperSubLanguage = () => {
        return (
            <>
                <div className={cx('setting-option')}>
                    <button className={cx('setting-item-btn')}>
                        <p className={cx('setting-item')}>Tiếng Việt</p>
                    </button>
                </div>
                <div className={cx('setting-option')}>
                    <button className={cx('setting-item-btn')}>
                        <p className={cx('setting-item')}>Tiếng Anh</p>
                    </button>
                </div>
            </>
        );
    };

    // Menu popper sub intro
    const renderMenuPopperSubIntro = () => {
        return (
            <>
                <div className={cx('setting-option')}>
                    <button className={cx('setting-item-btn')} onClick={handleModelIntroOpen}>
                        <p className={cx('setting-item')}>Thông tin phiên bản</p>
                    </button>
                    {/* Model intro */}
                    <Modal
                        open={open}
                        onClose={handleModelIntroClose}
                        style={{
                            position: 'absolute',
                            border: '2px solid #000',
                            backgroundColor: 'gray',
                            boxShadow: '2px solid black',
                            height: 80,
                            width: 240,
                            margin: 'auto',
                        }}
                    >
                        <h1>Model me</h1>
                    </Modal>
                </div>
                <div className={cx('setting-option')}>
                    <button className={cx('setting-item-btn')}>
                        <p className={cx('setting-item')}>Trung tâm hỗ trợ</p>
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className={cx('setting-header')}>
                <div className={cx('setting-option')}>
                    <FontAwesomeIcon className={cx('setting-icon')} icon={faUser} />
                    <button className={cx('setting-item-btn')}>
                        <p className={cx('setting-item')}>Thông tin tài khoản</p>
                    </button>
                </div>
                <div className={cx('setting-option')}>
                    <FontAwesomeIcon className={cx('setting-icon')} icon={faGear} />
                    <button className={cx('setting-item-btn')}>
                        <p className={cx('setting-item')}>Cài đặt</p>
                    </button>
                </div>
            </div>

            <div className={cx('separator')}></div>

            <div className={cx('setting-body')}>
                <div className={cx('setting-list')}>
                    {/* Popper Menu children */}
                    <TippyHeadless
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <Popper className={cx('menu-popper-sub-file')}>
                                    <div className={cx('setting-option')}>
                                        <button className={cx('setting-item-btn')}>
                                            <p className={cx('setting-item')}>Quản lý file</p>
                                        </button>
                                    </div>
                                </Popper>
                            </div>
                        )}
                        delay={[0, 100]}
                        offset={[16, 0]}
                        placement="right-end"
                        hideOnClick={false}
                        interactive
                    >
                        <div className={cx('setting-option')}>
                            <FontAwesomeIcon className={cx('setting-icon')} icon={faFloppyDisk} />
                            <button className={cx('setting-item-btn')}>
                                <p className={cx('setting-item')}>Lưu trữ</p>
                            </button>
                            <div className={cx('icon-right')}>
                                <FontAwesomeIcon className={cx('setting-icon')} icon={faAngleRight} />
                            </div>
                        </div>
                    </TippyHeadless>
                </div>

                <div className={cx('setting-list')}>
                    {/* Popper Menu children */}
                    <TippyHeadless
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <Popper className={cx('menu-popper-sub-language')}>
                                    {renderMenuPopperSubLanguage()}
                                </Popper>
                            </div>
                        )}
                        delay={[0, 100]}
                        offset={[46, 0]}
                        placement="right-end"
                        hideOnClick={false}
                        interactive
                    >
                        <div className={cx('setting-option')}>
                            <FontAwesomeIcon className={cx('setting-icon')} icon={faGlobe} />
                            <button className={cx('setting-item-btn')}>
                                <p className={cx('setting-item')}>Ngôn ngữ</p>
                            </button>
                            <div className={cx('icon-right')}>
                                <FontAwesomeIcon className={cx('setting-icon')} icon={faAngleRight} />
                            </div>
                        </div>
                    </TippyHeadless>
                </div>

                <div className={cx('setting-list')}>
                    {/* Popper Menu children */}
                    <TippyHeadless
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <Popper className={cx('menu-popper-sub-intro')}>{renderMenuPopperSubIntro()}</Popper>
                            </div>
                        )}
                        delay={[0, 100]}
                        offset={[46, 0]}
                        placement="right-end"
                        hideOnClick={false}
                        interactive
                    >
                        <div className={cx('setting-option')}>
                            <FontAwesomeIcon className={cx('setting-icon')} icon={faCircleInfo} />
                            <button className={cx('setting-item-btn')}>
                                <p className={cx('setting-item')}>Giới thiệu</p>
                            </button>
                            <div className={cx('icon-right')}>
                                <FontAwesomeIcon className={cx('setting-icon')} icon={faAngleRight} />
                            </div>
                        </div>
                    </TippyHeadless>
                </div>
            </div>

            <div className={cx('separator')}></div>

            <div className={cx('footer')}>
                <div className={cx('setting-option')}>
                    <FontAwesomeIcon className={cx('setting-icon')} icon={faRightFromBracket} />
                    <button className={cx('setting-item-btn')}>
                        <p className={cx('setting-item')}>Đăng xuất</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default MenuItem;
