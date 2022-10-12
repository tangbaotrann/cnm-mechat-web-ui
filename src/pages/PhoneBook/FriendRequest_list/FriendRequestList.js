import styles from './FriendRequestList.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import { useDispatch, useSelector } from 'react-redux';
import { accept } from '~/redux/features/friend/friendAccept';
import { userLogin } from '~/redux/selector';
const cx = classNames.bind(styles);

function FriendRequestList({ user }) {
    const dispatch = useDispatch();
    const infoUser = useSelector(userLogin);
    const handleAccept = () => {
        const data = {
            status: true,
            senderID: user.senderId,
            reciverID: infoUser._id,
            idRequest: user.idFriendRequest,
        };
        console.log(data);
        dispatch(accept(data));
    };
    return (
        <div className={cx('content')}>
            <div className={cx('request-List')}>
                <img className={cx('avatar-img')} src={user.imageLink ? user.imageLink : images.noImg} alt="avatar" />
                <div className={cx('content-2')}>
                    <p className={cx('username')}>{user.fullName}</p>
                    <p className={cx('message-1')}>Muốn kết bạn</p>
                    <p className={cx('message')}>{user.content}</p>
                </div>
                <div className={cx('relay')}>
                    <p className={cx('skip')}>Bỏ qua</p>
                    <button onClick={handleAccept}>Đồng ý</button>
                </div>
            </div>
        </div>
    );
}
export default FriendRequestList;
