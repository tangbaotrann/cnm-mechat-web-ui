// libs
import classNames from 'classnames/bind';
import { CircularProgress } from '@material-ui/core';

// me
import styles from './Home.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Center from '~/layouts/components/Middle';
import Rightbar from '~/layouts/components/Rightbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchApiUser } from '~/redux/features/user/userSlice';
import socket from '~/util/socket';
import listGroupUsers from '~/redux/features/Group/GroupSlice';

const cx = classNames.bind(styles);

function Home() {
    //Da doi qua ben app.js
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.data);
    const isLoading = useSelector((state) => state.listGroupUser.isLoading);

    useEffect(() => {
        document.title = 'Mechat Web';
    }, []);

    useEffect(() => {
        dispatch(fetchApiUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.emit('status_user', user._id);

        socket.on('get_users', (users) => {
            console.log('USER - ONLINE - CONVERSATION', users);
        });
    }, [user?._id]);

    // useEffect(() => {
    //     dispatch(listGroupUser());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            {isLoading ? (
                <CircularProgress className={cx('loading-messages')} />
            ) : (
                <div className={cx('wrapper')}>
                    <Sidebar />
                    <Center />
                    <Rightbar />
                </div>
            )}
        </>
    );
}

export default Home;
