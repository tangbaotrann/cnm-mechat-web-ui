// libs
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

// me
import styles from './Home.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Center from '~/layouts/components/Middle';
import Rightbar from '~/layouts/components/Rightbar';
import { fetchApiUser } from '~/redux/features/user/userSlice';
import socket from '~/util/socket';
import { isLoadingInHomePage, userInfoSelector } from '~/redux/selector';

const cx = classNames.bind(styles);

function Home() {
    //Da doi qua ben app.js
    const dispatch = useDispatch();

    const user = useSelector(userInfoSelector);
    const isLoading = useSelector(isLoadingInHomePage);

    useEffect(() => {
        document.title = 'Mechat Web';
    }, []);

    useEffect(() => {
        dispatch(fetchApiUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.emit('status_user', user._id);
    }, [user?._id]);

    return (
        <div className={cx('wrapper')}>
            {isLoading ? (
                <CircularProgress className={cx('loading-icon')} />
            ) : (
                <>
                    <Sidebar />
                    <Center />
                    <Rightbar />
                </>
            )}
        </div>
    );
}

export default Home;
