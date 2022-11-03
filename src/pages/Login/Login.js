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
    //loi
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorPassWord, setErrorPassWord] = useState('');
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
                } else if (resData?.error.statusCode === 401) {
                    throw new Error(401);
                } else if (resData?.error.statusCode === 403) {
                    throw new Error(403);
                } else if (resData?.error.statusCode === 402) {
                    throw new Error(402);
                }
            });
        // .catch((err) => {
        //     return Promise.reject(new Error('404 else'));
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var number = /^[0-9]{10}$/;
        if (!number.test(phoneNumber)) {
            setErrorPhoneNumber('Số điện thoại phải là số và đủ 10 số');
        } else {
            sign()
                .then((token) => {
                    if (typeof token != 'undefined') {
                        alert('Đăng nhập thành công');
                        console.log('hoan thanh');
                        console.log(token);
                        localStorage.setItem('user_login', JSON.stringify(token));
                        navigate('/me.chat');
                    }
                })
                .catch((err) => {
                    if (err.message === '401') {
                        if (phoneNumber === '') {
                            setErrorPhoneNumber('Vui lòng nhập số điện thoại');
                        } else if (password === '') {
                            setErrorPassWord('Vui lòng nhập mật khẩu');
                        } else {
                            setErrorPhoneNumber('Vui lòng nhập số điện thoại');
                            setErrorPassWord('Vui lòng nhập mật khẩu');
                        }
                    } else if (err.message === '403') {
                        setErrorPassWord('Sai nhập mật khẩu');
                    } else if (err.message === '402') {
                        setErrorPhoneNumber('Tài khoản không tồn tại');
                    }
                });
        }
    };

    ///bat loi sdt
    useEffect(() => {
        var number = /^[0-9]{10}$/;
        var phoneNumberForm = /^(09|03|07|08|05)\d{4}\d{4}$/;
        if (phoneNumber.length === 10) {
            if (!number.test(phoneNumber)) {
                setErrorPhoneNumber('Số điện thoại phải là số và đủ 10 số');
            } else if (!phoneNumberForm.test(phoneNumber)) {
                setErrorPhoneNumber('Số điện thoại không đúng');
            } else {
                setErrorPhoneNumber('');
            }
        }
    }, [phoneNumber]);
    useEffect(() => {
        if (password.length > 0) {
            setErrorPassWord('');
        }
    }, [password]);
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
                        <span className={cx('error')}>{errorPhoneNumber}</span>
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
                        <span className={cx('error')}>{errorPassWord}</span>
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
