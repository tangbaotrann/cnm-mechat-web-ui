// libs
import classNames from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComment,
    faGear,
    faAddressBook,
    faUser,
    faFloppyDisk,
    faAngleRight,
    faGlobe,
    faCircleInfo,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import Popper from '~/components/Popper';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            {/* top */}
            <div className={cx('sidebar-top')}>
                <div className={cx('avatar')}>
                    <Menu>
                        <img className={cx('avatar-img')} src={images.avt} alt="avatar" />
                    </Menu>
                </div>

                <div className={cx('option-items')}>
                    <NavLink className={(nav) => cx('item', { active: nav.isActive })} to="/">
                        <FontAwesomeIcon icon={faComment} />
                        <span className={cx('badge')}>5+</span>
                    </NavLink>
                    <NavLink className={(nav) => cx('item', { active: nav.isActive })} to="/directory">
                        <FontAwesomeIcon icon={faAddressBook} />
                    </NavLink>
                </div>
            </div>

            {/* bottom */}
            <div className={cx('sidebar-bottom')}>
                <div className={cx('option-items')}>
                    <TippyHeadless
                        render={(attrs) => (
                            <div tabIndex="-1" {...attrs}>
                                <Popper>
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
                                            <div className={cx('setting-option')}>
                                                <FontAwesomeIcon className={cx('setting-icon')} icon={faFloppyDisk} />
                                                <p className={cx('setting-item')}>Lưu trữ</p>
                                            </div>
                                            <FontAwesomeIcon className={cx('setting-icon')} icon={faAngleRight} />
                                        </div>

                                        <div className={cx('setting-list')}>
                                            <div className={cx('setting-option')}>
                                                <FontAwesomeIcon className={cx('setting-icon')} icon={faGlobe} />
                                                <p className={cx('setting-item')}>Ngôn ngữ</p>
                                            </div>
                                            <FontAwesomeIcon className={cx('setting-icon')} icon={faAngleRight} />
                                        </div>

                                        <div className={cx('setting-list')}>
                                            <div className={cx('setting-option')}>
                                                <FontAwesomeIcon className={cx('setting-icon')} icon={faCircleInfo} />
                                                <p className={cx('setting-item')}>Giới thiệu</p>
                                            </div>
                                            <FontAwesomeIcon className={cx('setting-icon')} icon={faAngleRight} />
                                        </div>
                                    </div>

                                    <div className={cx('separator')}></div>

                                    <div className={cx('footer')}>
                                        <div className={cx('setting-option')}>
                                            <FontAwesomeIcon className={cx('setting-icon')} icon={faRightFromBracket} />
                                            <p className={cx('setting-item')}>Đăng xuất</p>
                                        </div>
                                    </div>
                                </Popper>
                            </div>
                        )}
                        delay={[200, 400]}
                        placement="top-end"
                        hideOnClick={false}
                        interactive
                    >
                        {/* Add div fix warning of Tippy */}
                        <div>
                            <FontAwesomeIcon className={cx('item')} icon={faGear} />
                        </div>
                    </TippyHeadless>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
