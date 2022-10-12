// libs
import classNames from 'classnames/bind';

// me
import styles from './Home.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Center from '~/layouts/components/Middle';
import Rightbar from '~/layouts/components/Rightbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '~/redux/features/user/usersSlice';
import { fetchApiUser } from '~/redux/features/user/userSlice';
import { friendAccept } from '~/redux/features/friend/friendAccept';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchApiUser());
        dispatch(friendAccept());
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
