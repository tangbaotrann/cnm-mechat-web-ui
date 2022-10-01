import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddFriend.module.scss';
import Conversation from '../Conversation';
const cx = classNames.bind(styles);
function AddFriend()
{
 
    const [searchPhone, setSearchPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const searchRef = useRef();
    // Handle open/ close model info account

    useEffect(() => {
        if (!searchPhone.trim()) {
            return;
        }
   
        // fetch api
 
    }, [searchPhone]);
    const handleChangePhone = (e) => {
        const value = e.target.value;
        // Check no space first
        if (!value.startsWith(' ')) {
            setSearchPhone(value);
        }
    };
    const handleBtnClearText = () => {
        setSearchPhone('');
        searchRef.current.focus();
    };
    return (
            <div>
                        <div className={cx('add-phoneNumber')}>
                               <input
                                     type="tel"  
                                     placeholder='Số điện thoại'
                                     value={searchPhone}
                                    ref={searchRef}
                                     //onFocus={() => setShowResult(true)}
                                    onChange={handleChangePhone}
                                />
                         {!!searchPhone &&(
                                <button className={cx('clear-btn1')} onClick={handleBtnClearText}>
                                    <FontAwesomeIcon className={cx('clear-icon')} icon={faCircleXmark} />
                                </button>
                          )}
                        </div>
                         <div className={cx('result-search')}>
                            {searchResult.map((result, index) => {
                                return <Conversation key={index} user={result} />;
                            })}
                        </div> 
                        <div className={cx('add-friend-bottom')}>
                            <div className={cx('bottom-button')}>
                                <button className={cx('cancel')}>Hủy</button>
                                <button className={cx('search')}>Tìm kiếm</button>
                            </div>            
                        </div>
                   </div>
                 
    );
}
export default AddFriend