// libs
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCircleXmark,
    faSpinner,
    faUserPlus,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Search.module.scss';
import Popper from '../Popper';
import Conversation from '../Conversation';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchRef = useRef();

    useEffect(() => {
        if (!searchValue.trim()) {
            return;
        }

        setLoading(true);

        // fetch api
        setSearchResult([1, 2]);

        setLoading(false);
    }, [searchValue]);

    // Handle change value input
    const handleChange = (e) => {
        const value = e.target.value;

        // Check no space first
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };

    // Handle button clear text
    const handleBtnClearText = () => {
        setSearchValue('');
        searchRef.current.focus();
    };

    // Handle close result search
    const handleCloseResultSearch = () => {
        setShowResult(false);
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
                        onChange={handleChange}
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
                                <FontAwesomeIcon className={cx('item')} icon={faUserPlus} />
                            </Tippy>
                            <Tippy className={cx('tool-tip')} content="Tạo nhóm chat" delay={[200, 0]}>
                                <FontAwesomeIcon className={cx('item')} icon={faUserGroup} />
                            </Tippy>
                        </div>
                    )}
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;
