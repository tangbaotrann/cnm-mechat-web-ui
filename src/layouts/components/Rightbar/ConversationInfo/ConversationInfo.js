// libs
import classNames from 'classnames/bind';

// me
import styles from './ConversationInfo.module.scss';

const cx = classNames.bind(styles);

function ConversationInfo() {
    return (
        <div className={cx('wrapper')}>
            <h1>Thông tin hội thoại</h1>
        </div>
    );
}

export default ConversationInfo;
