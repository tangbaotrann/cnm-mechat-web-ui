import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import images from '~/assets/images';
import { listFriend } from '~/redux/selector';
import styles from './AddGroup.module.scss';
const cx = classNames.bind(styles);
function AddGroup() {
    const [searchPhone, setSearchPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const listFriends = useSelector(listFriend);
    const [checked, setChecked] = useState([]);
    const handleBtnClearText = (e) => {
        setSearchPhone('');
    };
    useEffect(() => {
        if (!searchValue.trim()) {
            return;
        }

        setLoading(true);

        // fetch api

        setLoading(false);
    }, [searchValue]);
    const handleSummit = () => {
        console.log(checked);
    };
    const handleCheck = (e) => {
        console.log(e.target.value);
        var updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }
        setChecked(updatedList);
    };

    return (
        <div>
            <div className={cx('add-Group')}>
                <label>Nhập tên nhóm: </label>
                <input
                    type="text"
                    placeholder="Nhập tên nhóm"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                />
                {!!searchPhone && (
                    <button className={cx('clear-btn1')} onClick={handleBtnClearText}>
                        <FontAwesomeIcon className={cx('clear-icon')} icon={faCircleXmark} />
                    </button>
                )}
            </div>
            <div className={cx('title-add-Group')}>
                <label>Thêm bạn vào nhóm</label>
            </div>

            <div className={cx('search')}>
                <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                <input
                    type="text"
                    className={cx('input-search')}
                    // value={searchValue}
                    // onChange={handleChange}
                    // onFocus={() => setShowResult(true)}
                    // ref={searchRef}
                    placeholder="Nhập tên, số điện thoại..."
                />
            </div>
            <div className={cx('list-friend')}>
                <label>Danh sách bạn bè</label>

                <div className={cx('conversations')}>
                    {listFriends?.map((user) => {
                        return (
                            <div className={cx('list-conversation')} key={user?._id}>
                                <div className={cx('input-radio')}>
                                    <input type="checkBox" value={user._id} onChange={handleCheck} />
                                </div>

                                <img
                                    className={cx('avatar-img')}
                                    src={user?.imageLinkOfConver ? user.imageLinkOfConver : images.noImg}
                                    alt="avatar"
                                />
                                <div className={cx('content')}>
                                    <h4 className={cx('username')}>{user?.name} </h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('add-friend-bottom')}>
                <div className={cx('bottom-button')}>
                    <button className={cx('cancel')}>Hủy</button>
                    <button className={cx('search')} onClick={handleSummit}>
                        Chọn
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AddGroup;
