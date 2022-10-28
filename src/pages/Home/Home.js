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

const cx = classNames.bind(styles);

function Home() {
    //Da doi qua ben app.js
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Mechat Web';
    }, []);

    useEffect(() => {
        // dispatch(fetchUsers());
        dispatch(fetchApiUser());
        // dispatch(friendAccept());
        // dispatch(meRequestFriend());
    });

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <Center />
            <Rightbar />
        </div>
    );
}

export default Home;
