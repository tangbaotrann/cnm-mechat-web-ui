import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { useState } from 'react';
import { PhoneIphone, Lock } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Login() {
    // useEffect(() => {
    //     document.title = 'Trang đăng nhập';
    // });
    const [user, setUser] = useState({
        phoneNumber: '0397548005',
        password: '123456',
    });
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        console.log({ [name]: value });
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(user);
        console.log(user);
    };
    return (
        <body>
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-image')} src={images.logo} alt="" />
                </div>
                <div className={cx('login-title')}>
                    <h1>Đăng Nhập</h1>
                </div>
                <div className={cx('login-form')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('form-phoneNumber')}>
                            <PhoneIphone className={cx('item')} />
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                name="phoneNumber"
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className={cx('form-password')}>
                            <Lock className={cx('password-item')} />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className={cx('form-button')}>
                            <Link to="/me.chat">
                                <button type="submit" variant="contained" color="primary">
                                    ĐĂNG NHẬP
                                </button>
                            </Link>
                        </div>
                        <div className={cx('form-forget')}>
                            <a href="/Register">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
                <div className={cx('form-register')}>
                    <h1>
                        <a href="/Register">Bạn chưa có tài khoản?</a>{' '}
                        <Link to="/Register" className={cx('form-register-register')}>
                            Đăng ký ngay{' '}
                        </Link>
                    </h1>
                </div>
            </div>
        </body>
    );
}
export default Login;
