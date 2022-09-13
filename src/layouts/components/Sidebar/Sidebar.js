// libs
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faAddressBook, faGear } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { MenuSetting } from './Menu';

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
                <MenuSetting>
                    {/* Add div fix warning of Tippy */}
                    <div>
                        <FontAwesomeIcon className={cx('item')} icon={faGear} />
                    </div>
                </MenuSetting>
            </div>
        </div>
    );
}

export default Sidebar;
