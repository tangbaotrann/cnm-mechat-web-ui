import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddFriend.module.scss';
import { searchFilterFriend, userLogin } from '~/redux/selector';
import filterSlice from '~/redux/features/filter/filterSlice';
import useDebounce from '../hooks/useDebounce';
import { usersRemainingSelector } from '~/redux/selector';
import { friendRequests } from '~/redux/features/friend/friendRequest';
const cx = classNames.bind(styles);
function AddFriend() {
    const [searchPhone, setSearchPhone] = useState('');
    const [searchResult, setSearchResult] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const debouncedValue = useDebounce(searchPhone, 500);
    const userSearching = useSelector(usersRemainingSelector);
    const infoUser = useSelector(userLogin);
    const searchFilterFriends = useSelector(searchFilterFriend);

    // Handle open/ close model info account
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filterSlice.actions.searchFilterChange(searchPhone));
    }, [debouncedValue]);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchPhone === infoUser.phoneNumber) {
            alert('Tài Khoản của bạn');
        } else {
            if (userSearching && userSearching !== 1) {
                setSearchResult(true);
                setPhoneNumber(userSearching[0]);
            } else {
                alert('Tài khoản không tồn tại');
            }
        }
        console.log(phoneNumber);
    };
    const handleBtnClearText = (e) => {
        setSearchPhone('');
        setPhoneNumber('');
        setSearchResult(false);
        dispatch(filterSlice.actions.searchFilterChange(null));
    };
    const handleRequest = () => {
        const data = { senderID: infoUser._id, receiverID: phoneNumber._id };
        let tam = dispatch(friendRequests(data));
        if (tam) {
            alert('Gửi lời mời kết bạn thành công');
            setSearchPhone('');
            setPhoneNumber('');
            dispatch(filterSlice.actions.searchFilterChange(null));
            setSearchResult(false);
        }
    };
    return (
        <div>
            <div className={cx('add-phoneNumber')}>
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                />
                {!!searchPhone && (
                    <button className={cx('clear-btn1')} onClick={handleBtnClearText}>
                        <FontAwesomeIcon className={cx('clear-icon')} icon={faCircleXmark} />
                    </button>
                )}
            </div>

            {!!searchResult ? (
                <div className={cx('list-conversation')}>
                    <img className={cx('avatar-img')} src={phoneNumber.avatar} alt="avatar" />

                    <div className={cx('content')}>
                        <h4 className={cx('username')}>{phoneNumber.fullName}</h4>
                        <p className={cx('message')}>{phoneNumber.phoneNumber}</p>
                    </div>
                    {searchFilterFriends === true ? (
                        <div className={cx('result-add-friend')}>
                            <button onClick={handleRequest}>Kết bạn</button>
                        </div>
                    ) : (
                        <div className={cx('result-friend')}>
                            <p>Bạn bè</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className={cx('tam')}></div>
            )}
            <div className={cx('add-friend-bottom')}>
                <div className={cx('bottom-button')}>
                    <button className={cx('cancel')} onClick={handleBtnClearText}>
                        Hủy
                    </button>
                    <button className={cx('search')} onClick={handleSearch}>
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AddFriend;
