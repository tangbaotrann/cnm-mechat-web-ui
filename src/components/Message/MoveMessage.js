// lib
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// me
import styles from './Message.module.scss';
import Conversation from '../Conversation';
import { fetchApiMoveMessage } from '~/redux/features/messages/messagesSlice';
import { listGroupUser, userInfoSelector } from '~/redux/selector';

const cx = classNames.bind(styles);

function MoveMessage({ message }) {
    const [checkedConversation, setCheckedConversation] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector(userInfoSelector);
    const conversations = useSelector(listGroupUser);

    // handle move message
    const handleMoveMessage = () => {
        dispatch(
            fetchApiMoveMessage({
                conversationId: checkedConversation,
                messageId: message._id,
                userId: user._id,
            }),
        );
    };

    // handle checked conversation
    const handleCheckedConversation = (id) => {
        setCheckedConversation((prev) => {
            const isChecked = checkedConversation.includes(id);

            if (isChecked) {
                return checkedConversation.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <div className={cx('fixed')}>
            {conversations.map((con) => {
                return (
                    <div key={con.id}>
                        {con.id && !con?.deleteBy.includes(user._id) && (
                            <div key={con.id} className={cx('container-conversation')}>
                                <div className={cx('inner-conversation')}>
                                    <input
                                        className={cx('option-check')}
                                        type="checkbox"
                                        onChange={() => handleCheckedConversation(con.id)}
                                        checked={checkedConversation.includes(con.id)}
                                    />
                                    <Conversation isPhoneBook key={con.id} conversation={con} />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            <button className={cx('btn-move-message')} onClick={handleMoveMessage}>
                Chuyển tiếp tin nhắn
            </button>
        </div>
    );
}

export default MoveMessage;
