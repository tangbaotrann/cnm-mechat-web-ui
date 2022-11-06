// libs
import classNames from 'classnames/bind';

// me
import styles from './Home.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Center from '~/layouts/components/Middle';
import Rightbar from '~/layouts/components/Rightbar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchApiUser } from '~/redux/features/user/userSlice';
import { meRequestFriend } from '~/redux/features/friend/meFriendRequestSlice';
import { friendAccept } from '~/redux/features/friend/friendAcceptSlice';
import { fetchUsers } from '~/redux/features/user/usersSlice';
import { listGroupUser } from '~/redux/features/Group/GroupSlice';

const cx = classNames.bind(styles);

function Home() {
    //Da doi qua ben app.js
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Mechat Web';
    }, []);

    useEffect(() => {
        dispatch(fetchApiUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <Center />
            <Rightbar />
        </div>
    );
}

export default Home;
