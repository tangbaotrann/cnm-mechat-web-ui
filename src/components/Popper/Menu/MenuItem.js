// libs
import classNames from 'classnames/bind';

// me
import styles from './Menu.module.scss';
import ModelInfoAccount from '~/components/ModelWrapper/ModelInfoAccount';

const cx = classNames.bind(styles);

function MenuItem({ user }) {
    return (
        <>
            <h3 className={cx('fullname')}>{user?.fullName}</h3>

            <div className={cx('separator')}></div>

            <div className={cx('body-inner')}>
                {/* Model info account */}
                <ModelInfoAccount yourProfile user={user} />

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
