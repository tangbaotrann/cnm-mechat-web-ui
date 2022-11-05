import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCircleXmark,
    faSpinner,
    faUserPlus,
    faUserGroup,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { fetchApiFriendsById } from '~/redux/features/friend/friendsSlice';

// me
import styles from './Search.module.scss';
import Popper from '../Popper';
import Conversation from '../Conversation';
import ModelWrapper from '../ModelWrapper';
import AddFriend from '../AddFriend';
import AddGroup from '../AddGroup';
import filterSlice from '~/redux/features/filter/filterSlice';
// import { useDispatch, useSelector } from 'react-redux';
import { allSearch } from '~/redux/selector';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openInfoAccount, setOpenInfoAccount] = useState(false);
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const userSearching = useSelector(allSearch);
    //console.log(userSearching);
    const searchRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filterSlice.actions.searchFilterChange(searchValue));
    }, [searchValue]);
    useEffect(() => {
        if (!searchValue.trim()) {
            return;
        }

        setLoading(true);
        //setSearchResult([userSearching[0], userSearching[0]._id]);
        setLoading(false);
    }, [dispatch, searchValue]);

    // Handle change value input

    // Handle button clear text
    const handleBtnClearText = () => {
        setSearchValue('');
        searchRef.current.focus();
    };

    // Handle close result search
    const handleCloseResultSearch = () => {
        setShowResult(false);

        setSearchValue('');
    };
    const handleModelOpenInfoAccount = () => {
        setOpenInfoAccount(true);
    };
    const handleModelCloseInfoAccount = () => {
        setOpenInfoAccount(false);
    };

    const handleModelOpenAddGroup = () => {
        setOpenAddGroup(true);
    };
    const handleModelCloseOpenAddGroup = () => {
        setOpenAddGroup(false);
    };
    return (
        <div className={cx('wrapper')}>
            <TippyHeadless
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <Popper className={cx('menu-list-search')}>
                            <div className={cx('menu-search-title')}>Trò chuyện</div>
                            {/* Render result search */}
                            {searchResult.map((result, index) => {
                                console.log('----', result);
                                return <Conversation key={index} user={result} />;
                            })}
                        </Popper>
                    </div>
                )}
                placement="bottom-start"
                interactive
                visible={showResult && searchResult.length > 0}
            >
                <div className={cx('search')}>
                    <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        className={cx('input-search')}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                        ref={searchRef}
                        placeholder="Tìm kiếm"
                    />

                    {/* Button clear */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleBtnClearText}>
                            <FontAwesomeIcon className={cx('clear-icon')} icon={faCircleXmark} />
                        </button>
                    )}

                    {/* Icon loading */}
                    {loading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}

                    {/* Button close result search */}
                    {showResult ? (
                        <button className={cx('close-result-search-btn')} onClick={handleCloseResultSearch}>
                            Đóng
                        </button>
                    ) : (
                        <div className={cx('items')}>
                            <Tippy className={cx('tool-tip')} content="Thêm bạn" delay={[200, 0]}>
                                <button className={cx('btn-click-icon')}>
                                    <FontAwesomeIcon
                                        className={cx('item')}
                                        icon={faUserPlus}
                                        onClick={handleModelOpenInfoAccount}
                                    />
                                </button>
                            </Tippy>
                            <Tippy className={cx('tool-tip')} content="Tạo nhóm chat" delay={[200, 0]}>
                                <button className={cx('btn-click-icon')}>
                                    <FontAwesomeIcon
                                        className={cx('item')}
                                        icon={faUserGroup}
                                        onClick={handleModelOpenAddGroup}
                                    />
                                </button>
                            </Tippy>
                        </div>
                    )}
                </div>
            </TippyHeadless>
            <ModelWrapper
                className={cx('model-add-friend')}
                open={openInfoAccount}
                onClose={handleModelCloseInfoAccount}
            >
                <div className={cx('model-add-friend-bg')}>
                    <div className={cx('add-friend-title')}>
                        <span className={cx('friend-title')}>Thêm bạn</span>
                        <button className={cx('close-btn')}>
                            <FontAwesomeIcon
                                className={cx('friend-close-ic')}
                                icon={faXmark}
                                onClick={handleModelCloseInfoAccount}
                            />
                        </button>
                    </div>
                    <AddFriend />
                </div>
            </ModelWrapper>

            {/* Tạo nhóm */}
            <ModelWrapper className={cx('model-add-friend')} open={openAddGroup} onClose={handleModelCloseOpenAddGroup}>
                <div className={cx('model-add-group-bg')}>
                    <div className={cx('add-friend-title')}>
                        <span className={cx('friend-title')}>Tạo nhóm</span>
                        <button className={cx('close-btn')}>
                            <FontAwesomeIcon
                                className={cx('friend-close-ic')}
                                icon={faXmark}
                                onClick={handleModelCloseInfoAccount}
                            />
                        </button>
                    </div>
                    <AddGroup />
                </div>
            </ModelWrapper>
        </div>
    );
}

export default Search;
