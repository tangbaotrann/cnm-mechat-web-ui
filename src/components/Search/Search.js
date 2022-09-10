// libs
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <FontAwesomeIcon className={cx('icon-search')} icon={faMagnifyingGlass} />
                <input type="text" className={cx('input-search')} placeholder="Tìm kiếm" />
            </div>
        </div>
    );
}

export default Search;
