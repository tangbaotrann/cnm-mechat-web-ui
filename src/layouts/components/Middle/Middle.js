// libs
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

// me
import styles from './Middle.module.scss';
import Conversation from '~/components/Conversation';
import Search from '~/components/Search';
import socket from '~/util/socket';
import listGroupUsers, { fetchApiConversationById } from '~/redux/features/Group/GroupSlice';
import { userInfoSelector, listGroupUser, isLoadingConversation } from '~/redux/selector';

const cx = classNames.bind(styles);

function Middle() {
    const dispatch = useDispatch();

    const user = useSelector(userInfoSelector);
    const conversations = useSelector(listGroupUser);
    const isLoading = useSelector(isLoadingConversation);

    // Handle fetch conversation
    useEffect(() => {
        dispatch(fetchApiConversationById(user._id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);

    // realtime with create group
    useEffect(() => {
        socket.on('send_conversation_group', (conversation) => {
            // console.log('[send_conversation_group]', conversation);
            if (conversation) {
                dispatch(listGroupUsers.actions.arrivalCreateGroupFromSocket(conversation));
                dispatch(listGroupUsers.actions.arrivalMemberJoinGroupFromSocket(conversation));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // realtime with out-group
    useEffect(() => {
        socket.on('remove_conversation_block_group', (info) => {
            // console.log('[remove_conversation_block_group]', info);
            dispatch(listGroupUsers.actions.arrivalDeleteConversationOutGroupFromSocket(info));
            // dispatch(listGroupUsers.actions.arrivalRemoveConversationFromSocket(info));
        });

        socket.on('update_last_message', (info) => {
            // console.log('[update_last_message]', info);
            dispatch(listGroupUsers.actions.arrivalUpdateLastMessageFromSocket(info));
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {conversations.map((conversation) => {
                            return (
                                <>
                                    {conversation.id && (
                                        <div
                                            onClick={() =>
                                                dispatch(listGroupUsers.actions.clickConversation(conversation))
                                            }
                                            key={conversation.id}
                                        >
                                            <Conversation key={conversation.id} conversation={conversation} />
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default Middle;
