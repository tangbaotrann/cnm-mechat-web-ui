// libs
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';
// me
import styles from './Conversation.module.scss';
import images from '~/assets/images';
import { MoreHoriz } from '@material-ui/icons';
import { userLogin } from '~/redux/selector';
import Popper from '../Popper';
import { friendDelete } from '~/redux/features/friend/friendAcceptSlice';
import ModelInfoAccount from '../ModelWrapper/ModelInfoAccount';
import { useEffect, useState } from 'react';
import axios from 'axios';
import conversationSlice from '~/redux/features/conversation/conversationSlice';

const cx = classNames.bind(styles);

function Conversation({ conversation, isPhoneBook, Group }) {
    const infoUser = useSelector(userLogin);

    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    //  tam
    const [conversations, setConversation] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${user?._id}`);
                setConversation(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, [user?._id]);

    const handleCancel = () => {
        let deletes = window.confirm('Bạn có chắc chắn muốn sửa không?');
        if (deletes === true) {
            const data = {
                idUser: infoUser._id,
                status: true,
                userDeleteId: conversation._id,
            };
            dispatch(friendDelete(data));
            alert('Xóa bạn thành công');
        } else {
            alert('bạn đã hủy yêu cầu xóa bạn');
        }
    };

    //
    const tam = () => {
        conversations.map((c) => {
            if (c.members.includes(conversation._id)) {
                if (c.isGroup === false) {
                    return dispatch(conversationSlice.actions.clickConversation(c));
                }
            }
        });
    };

    return (
        <div className={cx('list-conversation')} onClick={tam}>
            <img
                className={cx('avatar-img')}
                src={conversation?.imageLinkOfConver ? conversation.imageLinkOfConver : images.noImg}
                alt="avatar"
            />

            <div className={cx('content')}>
                <h4 className={cx('username')}>{conversation?.name} </h4>
                {isPhoneBook ? null : (
                    <p className={cx('message')}>{conversation?.content || conversation?.lastMessage}</p>
                )}
            </div>

            {isPhoneBook && !Group ? (
                <TippyHeadless
                    render={(attrs) => (
                        <div tabIndex="-1" {...attrs}>
                            <Popper className={cx('own-menu-list-children')}>
                                <p className={cx('deleteFriend')}>
                                    <ModelInfoAccount yourProfile friend user={conversation} />
                                </p>
                                <p className={cx('deleteFriend')} onClick={handleCancel}>
                                    <button className={cx('item-btn')}> Xóa Bạn</button>
                                </p>
                            </Popper>
                        </div>
                    )}
                    interactive
                    trigger="click"
                    placement="bottom-start"
                    offset={[4, 4]}
                >
                    <Tippy className={cx('tool-tip')} content="" delay={[200, 0]}>
                        <div>
                            <MoreHoriz className={cx('item')} />
                        </div>
                    </Tippy>
                </TippyHeadless>
            ) : null}
            {isPhoneBook ? null : (
                <div className={cx('notification')}>
                    <span className={cx('time')}>{format(conversation?.time)}</span>
                    {/* <span className={cx('badge')}>5+</span> */}
                </div>
            )}
        </div>
    );
}

export default Conversation;
