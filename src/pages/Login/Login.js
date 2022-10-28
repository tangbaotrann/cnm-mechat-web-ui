import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import { useState, useEffect } from 'react';
import { PhoneIphone, Lock } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
//

const cx = classNames.bind(styles);

function Login() {
    useEffect(() => {
        document.title = 'Trang đăng nhập';
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user_login')) {
            navigate('/me.chat');
        }
    });
    const sign = () => {
        return fetch(`${process.env.REACT_APP_BASE_URL}auths/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                passWord: password,
            }),
        })
            .then((res) => res.json())
            .then((resData) => {
                if (resData.status === 'success') {
                    return resData;
                } else if (resData?.error.statusCode === 403) {
                    throw new Error('Sai mật khẩu');
                } else if (resData?.error.statusCode === 402) {
                    throw new Error('Tài khoản không tồn tại');
                }
            });
        // .catch((err) => {
        //     return Promise.reject(new Error('404 else'));
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var phoneNumberForm = /^(09|03|07|08|05)\d{4}\d{4}$/;
        var number = /^[0-9]{10}$/;
        if (phoneNumber === '' || password === '') {
            alert('Vui lòng nhập đầy đủ thông tin');
        } else if (!number.test(phoneNumber)) {
            alert('Số điện thoại phải là số và đủ 10 số');
        } else if (!phoneNumberForm.test(phoneNumber)) {
            alert('Số điện thoại không đúng');
        } else {
            sign()
                .then((token) => {
                    if (typeof token != 'undefined') {
                        console.log(token);
                        alert('Đăng nhập thành công');
                        console.log('hoan thanh');
                        console.log(token);
                        localStorage.setItem('user_login', JSON.stringify(token));
                        navigate('/me.chat');
                    }
                })
                .catch((err) => {
                    // console.log(err + 'handleSubmit');
                    alert(err.message);
                });
        }
    };

    return (
        <div className={cx('body-login')}>
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
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-password')}>
                            <Lock className={cx('password-item')} />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-button')}>
                            <button type="submit" variant="contained" color="primary" onClick={sign}>
                                ĐĂNG NHẬP
                            </button>
                        </div>
                        <div className={cx('form-forget')}>
                            <a href="/forget-password">Quên mật khẩu?</a>
                        </div>
                    </form>
                </div>
                <div className={cx('form-register')}>
                    <h1>
                        <p>Bạn chưa có tài khoản? </p>
                        <Link to="/register" className={cx('form-register-register')}>
                            Đăng ký ngay
                        </Link>
                    </h1>
                </div>
            </div>
        </div>
    );
}
export default Login;
