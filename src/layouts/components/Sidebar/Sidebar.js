// libs
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faAddressBook, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

// me
import styles from './Sidebar.module.scss';
import Menu from '~/components/Popper/Menu';
import { MenuSetting } from './Menu';
import { userLogin } from '~/redux/selector';

const cx = classNames.bind(styles);

function Sidebar() {
    const user = useSelector(userLogin);
    return (
        <div className={cx('wrapper')}>
            {/* top */}
            <div className={cx('sidebar-top')}>
                <div className={cx('avatar')}>
                    <Menu>
                        <img className={cx('avatar-img')} src={user.avatarLink} alt="avatar" />
                    </Menu>
                </div>

                <div className={cx('option-items')}>
                    <Tippy
                        className={cx('tool-tip')}
                        content="Tin nhắn"
                        delay={[200, 0]}
                        placement="bottom-end"
                        offset={[40, -8]}
                    >
                        <NavLink className={(nav) => cx('option-item', { active: nav.isActive })} to="/me.chat">
                            <FontAwesomeIcon icon={faComment} />
                            <span className={cx('badge')}>5+</span>
                        </NavLink>
                    </Tippy>
                    <Tippy
                        className={cx('tool-tip')}
                        content="Danh bạ"
                        delay={[200, 0]}
                        placement="bottom-end"
                        offset={[40, -6]}
                    >
                        <NavLink className={(nav) => cx('option-item', { active: nav.isActive })} to="/phonebook">
                            <FontAwesomeIcon icon={faAddressBook} />
                        </NavLink>
                    </Tippy>
                </div>
            </div>

            {/* bottom */}
            <div className={cx('sidebar-bottom')}>
                <MenuSetting>
                    <Tippy className={cx('tool-tip')} content="Cài đặt" delay={[200, 0]}>
                        {/* Add div fix warning of Tippy */}
                        <div>
                            <FontAwesomeIcon className={cx('option-item')} icon={faGear} />
                        </div>
                    </Tippy>
                </MenuSetting>
            </div>
        </div>
    );
}

export default Sidebar;
