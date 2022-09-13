// libs
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
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
    // Menu popper sub language
    const renderMenuPopperSubLanguage = () => {
        return (
            <>
                <div className={cx('setting-option')}>
                    <p className={cx('setting-item')}>Tiếng Việt</p>
                </div>
                <div className={cx('setting-option')}>
                    <p className={cx('setting-item')}>Tiếng Anh</p>
                </div>
            </>
        );
    };

    // Menu popper sub intro
    const renderMenuPopperSubIntro = () => {
        return (
            <>
                <div className={cx('setting-option')}>
                    <p className={cx('setting-item')}>Thông tin phiên bản</p>
                </div>
                <div className={cx('setting-option')}>
                    <p className={cx('setting-item')}>Trung tâm hỗ trợ</p>
                </div>
            </>
        );
    };

    return (
        <>
            <div className={cx('setting-header')}>
                <div className={cx('setting-option')}>
                    <FontAwesomeIcon className={cx('setting-icon')} icon={faUser} />
                    <p className={cx('setting-item')}>Thông tin tài khoản</p>
                </div>
                <div className={cx('setting-option')}>
                    <FontAwesomeIcon className={cx('setting-icon')} icon={faGear} />
                    <p className={cx('setting-item')}>Cài đặt</p>
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
                                        <p className={cx('setting-item')}>Quản lý file</p>
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
                            <p className={cx('setting-item')}>Lưu trữ</p>
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
                            <p className={cx('setting-item')}>Ngôn ngữ</p>
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
                            <p className={cx('setting-item')}>Giới thiệu</p>
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
                    <p className={cx('setting-item')}>Đăng xuất</p>
                </div>
            </div>
        </>
    );
}

export default MenuItem;
