import styles from './FriendRequestList.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import { useDispatch, useSelector } from 'react-redux';
import { accept } from '~/redux/features/friend/friendAccept';
import { userLogin } from '~/redux/selector';
import { callBack } from '~/redux/features/friend/meFriendRequest';
const cx = classNames.bind(styles);

function FriendRequestList({ user, isPhoneBook }) {
    const dispatch = useDispatch();
    const infoUser = useSelector(userLogin);
    console.log(infoUser);
    const handleAccept = () => {
        const data = {
            status: true,
            senderID: user.senderId,
            receiverID: infoUser._id,
            idRequest: user.idFriendRequest,
        };
        dispatch(accept(data));
        if (accept()) {
            alert('chấp nhận kết bạn thành công');
        } else {
            alert('Số điện thoại chưa đăng ký tài khoảng');
        }
    };
    const handleCancel = () => {
        const data = {
            status: false,
            senderID: user.senderId,
            receiverID: infoUser._id,
            idRequest: user.idFriendRequest,
        };
        dispatch(accept(data));
    };
    const handleCallback = () => {
        const data = {
            status: true,
            senderID: infoUser._id,
            idRequest: user.idFriendRequest,
        };
        dispatch(callBack(data));
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
                {isPhoneBook ? (
                    <div className={cx('relay')}>
                        <p className={cx('skip')} onClick={handleCancel}>
                            Bỏ qua
                        </p>
                        <button onClick={handleAccept}>Đồng ý</button>
                    </div>
                ) : (
                    <div className={cx('relay')}>
                        <button onClick={handleCallback}>Thu hồi</button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default FriendRequestList;
