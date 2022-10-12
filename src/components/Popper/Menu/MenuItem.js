// libs
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
// me
import styles from './Menu.module.scss';
import ModelInfoAccount from '~/components/ModelWrapper/ModelInfoAccount';
import { userLogin } from '~/redux/selector';

const cx = classNames.bind(styles);

function MenuItem() {
    const user = useSelector(userLogin);
    return (
        <>
            <h3 className={cx('fullName')}>{user.fullName}</h3>

            <div className={cx('separator')}></div>

            <div className={cx('body-inner')}>
                {/* Model info account */}
                <ModelInfoAccount yourProfile />

                <button className={cx('item-btn')}>Cài đặt</button>
            </div>

            <div className={cx('separator')}></div>

            <div className={cx('footer')}>
                <button className={cx('item-btn')}>Đăng xuất</button>
            </div>
        </>
    );
}

export default MenuItem;
