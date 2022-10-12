import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import { useState, useEffect } from 'react';
import { PhoneIphone, Lock } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
//

import { authentication } from '~/util/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

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
        return fetch(`${process.env.REACT_APP_BASE_URL}users/login`, {
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
                    console.log(resData);
                    return resData;
                } else {
                    return Promise.reject(new Error('404 else'));
                }
            })
            .catch((err) => {
                return Promise.reject(new Error('404 else'));
            });
    };

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'tam',
            {
                size: 'invisible',
                callback: (response) => {},
            },
            authentication,
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sign()
            .then((token) => {
                console.log(token);
                console.log('da click');
                console.log(phoneNumber + 'ngoai if');
                if (phoneNumber.length >= 10) {
                    //  setchangeForm(true);
                    console.log(phoneNumber + 'trong if');
                    generateRecaptcha();
                    const phoneNumbers = '+84' + phoneNumber.slice(1);
                    console.log(phoneNumbers + 'sao khi +84');
                    const appVerifier = window.recaptchaVerifier;
                    signInWithPhoneNumber(authentication, phoneNumbers, appVerifier)
                        .then((confirmationResult) => {
                            // SMS sent. Prompt user to type the code from the message, then sign the
                            // user in with confirmationResult.confirm(code).
                            window.confirmationResult = confirmationResult;
                            console.log('ĐÃ gửi OTP');
                            // ...
                            navigate('/ConFirmOTP', { state: token });
                        })
                        .catch((error) => {
                            // Error; SMS not sent
                            // ...
                            alert('Số điện thoại chưa đăng ký tài khoảng');
                            console.log('Chưa gửi về OTP' + error);
                        });
                }
            })
            .catch((err) => {
                console.log(err + 'handleSubmit');
                alert('tài khoản không tồn tại');
            });
    };

    return (
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
                        <div id="tam"></div>
                    </div>
                    <div className={cx('form-forget')}>
                        <a href="/forgotpassword">Quên mật khẩu?</a>
                    </div>
                </form>
            </div>
            <div className={cx('form-register')}>
                <h1>
                    <p>Bạn chưa có tài khoản? </p>
                    <Link to="/Register" className={cx('form-register-register')}>
                        Đăng ký ngay
                    </Link>
                </h1>
            </div>
        </div>
    );
}
export default Login;
