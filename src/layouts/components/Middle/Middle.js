// libs
import classNames from 'classnames/bind';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// me
import styles from './Middle.module.scss';
import Conversation from '~/components/Conversation';
import Search from '~/components/Search';
import conversationSlice from '~/redux/features/conversation/conversationSlice';

const cx = classNames.bind(styles);

function Middle() {
    const [conversations, setConversation] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.data);

    // console.log('USER - MID - ', user._id); // --> get user
    // console.log('[conversations] - ', conversations);
    // console.log('[user] - ', user);

    // Handle fetch conversation
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${user?._id}`);
                console.log('conversation by id - ', res.data.data);
                setConversation(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, [user?._id]);

    return (
        <div className={cx('wrapper')}>
            {/* search */}
            <div className={cx('search-info')}>
                <Search />
            </div>

            {/* Option */}
            <div className={cx('option')}></div>

            {/* hr */}
            <div className={cx('separator')}></div>

            {/* Conversation */}
            <div className={cx('conversations')}>
                {conversations.map((conversation) => {
                    return (
                        <div
                            key={conversation.id}
                            onClick={() => dispatch(conversationSlice.actions.clickConversation(conversation))}
                        >
                            <Conversation conversation={conversation} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Middle;
