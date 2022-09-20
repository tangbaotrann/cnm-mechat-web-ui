// libs
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './Middle.module.scss';
import Conversation from '~/components/Conversation';
import Search from '~/components/Search';
import { FetchUsers as users } from '~/FetchData';

const cx = classNames.bind(styles);

function Middle({ directory }) {
    const MiddleDirectory = () => {
        return (
            <div>
                <h1>Content directory ...</h1>
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            {/* search */}
            <div className={cx('search-info')}>
                <Search />
                <div className={cx('items')}>
                    <FontAwesomeIcon className={cx('item')} icon={faUserPlus} />
                    <FontAwesomeIcon className={cx('item')} icon={faUserGroup} />
                </div>
            </div>

            {/* Option */}
            <div className={cx('option')}></div>

            {/* hr */}
            <div className={cx('separator')}></div>

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
    );
}

export default Middle;
