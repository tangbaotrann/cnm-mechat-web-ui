// libs
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import { faUserPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
// import {PersonAddAltIcon, Lock} from '@material-ui/icons';4
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// me
import styles from './PhoneBook.module.scss';
import { FetchUsers as users } from '~/FetchData';
import Search from '~/components/Search';
import Conversation from '~/components/Conversation';
import BoxChat from '~/components/BoxChat';



//component
import Sidebar from '~/layouts/components/Sidebar';
const cx = classNames.bind(styles);

function PhoneBook({ directory }) {
    const MiddleDirectory = () => {
        return (
            <div>
                <h1>Content directory ...</h1>
            </div>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <Sidebar/>
        <div className={cx('wrapper-center')}>
            <div className={cx('search-info')}>
                <Search />
                <div className={cx('items')}>
                    <FontAwesomeIcon className={cx('item')} icon={faUserPlus} />
                    <FontAwesomeIcon className={cx('item')} icon={faUserGroup} />
                </div>
            </div>
            <div className={cx('add-friend')}>
                <NavLink>
                <PersonAddAltIcon className={cx('item')} />
                </NavLink>
                <h2 className={cx('add-friend-title')}>Thêm bạn bằng số điện thoại</h2>
            </div>
            <div className={cx('list-addfriend')}>
            <img className={cx('list-addfriend-image')} src={images.listfriend} alt=""/>
            <h2 className={cx('list-addfriend-title')}>Danh sách kết bạn</h2>
            </div>
            <div className={cx('list-addfriend')}>
            <img className={cx('list-addfriend-image')} src={images.groupchat} alt=""/>
            <h2 className={cx('list-addfriend-title')}>Danh sách nhóm</h2>
            </div>
            <div className={cx('list-friend')}>
                    <h1>Bạn bè (5)</h1>
                    
            {/* Conversation or MiddleDirectory */}
            {!directory ? (
                <div className={cx('conversations')}>
                    {users.map((user) => {
                        return <Conversation key={user.id} user={user} />;
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
            <img className={cx('list-addfriend-image')} src={images.groupchat} alt=""/>
            <h2 className={cx('list-addfriend-title2')}>Danh sách nhóm</h2>
            </div>
                <div className={cx('list-BoxChat')}>
                  <BoxChat/>
                   <BoxChat/>
                  <BoxChat/>
                  <BoxChat/>
                  <BoxChat/>
                  <BoxChat/> 
                  <BoxChat/>
                  <BoxChat/>
                  <BoxChat/>
                  <BoxChat/> 
                  <BoxChat/>
                  <BoxChat/> 
               
                </div>
         
            </div>
        </div>
           
        </div>
    );
}

export default PhoneBook;
