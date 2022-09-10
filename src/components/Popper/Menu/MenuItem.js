// libs
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

// me
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem() {
    return (
        <>
            <h3 className={cx('fullname')}>Tăng Bảo Trấn</h3>

            <div className={cx('separator')}></div>

            <div className={cx('body')}>
                <Link to="/">
                    <p className={cx('file')}>Hồ sơ của bạn</p>
                </Link>
                <Link to="/">
                    <p className={cx('setting')}>Cài đặt</p>
                </Link>
            </div>

            <div className={cx('separator')}></div>

            <div className={cx('footer')}>
                <Link to="/">
                    <p className={cx('logout')}>Đăng xuất</p>
                </Link>
            </div>
        </>
    );
}

export default MenuItem;
