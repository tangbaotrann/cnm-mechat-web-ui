// libs
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from 'react';
// me
import styles from './PhoneBook.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search';
import Conversation from '~/components/Conversation';
import Sidebar from '~/layouts/components/Sidebar';
import { FetchUsers as users } from '~/FetchData';
import BoxChat from '~/components/BoxChat';

import ModelWrapper from '~/components/ModelWrapper';
import AddFriend from '~/components/AddFriend';
const cx = classNames.bind(styles);

function PhoneBook({ directory }) {
    const [openInfoAccount, setOpenInfoAccount] = useState(false);
    const MiddleDirectory = () => {
        return (
            <div>
                <h1>Content directory ...</h1>
            </div>
        );
    };
    const handleModelOpenInfoAccount = () => {
        setOpenInfoAccount(true);
    };
    const handleModelCloseInfoAccount = () => {
        setOpenInfoAccount(false);
    };
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('wrapper-center')}>
                <div className={cx('search-info')}>
                    <Search />
                </div>
                <div className={cx('add-friend')} onClick={handleModelOpenInfoAccount}>
                    <NavLink>
                        <PersonAddAltIcon className={cx('item')} />
                    </NavLink>
                    <h2 className={cx('add-friend-title')}>Thêm bạn bằng số điện thoại</h2>
                </div>
                <div className={cx('list-addfriend')}>
                    <img className={cx('list-addfriend-image')} src={images.listfriend} alt="" />
                    <h2 className={cx('list-addfriend-title')}>Danh sách kết bạn</h2>
                </div>
                <div className={cx('list-addfriend')}>
                    <img className={cx('list-addfriend-image')} src={images.groupchat} alt="" />
                    <h2 className={cx('list-addfriend-title')}>Danh sách nhóm</h2>
                </div>
                <div className={cx('list-friend')}>
                    <h1>Bạn bè (5)</h1>

                    {/* Conversation or MiddleDirectory */}
                    {!directory ? (
                        <div className={cx('conversations')}>
                            {users.map((user) => {
                                return <Conversation key={user.id} user={user} isPhoneBook />;
                            })}
                        </div>
                    ) : (
                        <MiddleDirectory />
                    )}
                </div>
            </div>
            <div className={cx('wrapper-rightbar')}>
                <div className={cx('header')}>
                    <div className={cx('list-addfriend')}>
                        <img className={cx('list-addfriend-image')} src={images.groupchat} alt="" />
                        <h2 className={cx('list-addfriend-title2')}>Danh sách nhóm</h2>
                    </div>
                    <div className={cx('list-BoxChat')}>
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                        <BoxChat />
                    </div>
                </div>
            </div>
            <ModelWrapper className={cx('model-add-friend')} open={openInfoAccount} onClose={handleModelCloseInfoAccount}>
                            <AddFriend/>
             </ModelWrapper>
        </div>
    );
}

export default PhoneBook;
