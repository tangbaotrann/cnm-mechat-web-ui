// libs
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

// me
import styles from './Conversation.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Conversation({ conversation, isPhoneBook }) {
    const message = useSelector((state) => state.messages.clickSendMessage);

    // console.log('MESSAGE - CONVERSATION - ', message);
    // console.log('CONVERSATION - CONVERSATION - ', conversation);

    return (
        <div className={cx('list-conversation')}>
            <img
                className={cx('avatar-img')}
                src={conversation.imageLinkOfConver ? conversation.imageLinkOfConver : images.noImg}
                alt="avatar"
            />

            <div className={cx('content')}>
                <h4 className={cx('username')}>{conversation.name} </h4>
                {isPhoneBook ? null : (
                    <p className={cx('message')}>
                        {message?.conversationID === conversation.id ? message.content : conversation.content}
                    </p>
                )}
            </div>
            {isPhoneBook ? null : (
                <div className={cx('notification')}>
                    <span className={cx('time')}>{format(conversation.time)}</span>
                    {/* <span className={cx('badge')}>5+</span> */}
                </div>
            )}
        </div>
    );
}

export default Conversation;
