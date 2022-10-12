//lib
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneIphone, Lock, Person, ArrowLeft } from '@material-ui/icons';
import classNames from 'classnames/bind';
//me
import styles from './Register.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Register() {
    useEffect(() => {
        document.title = 'Trang đăng ký';
    });
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(userName + phoneNumber + password + confirmPassword);
        if (password < 6) {
            alert('Mật khẩu phải lớn 6 chữ số');
        }
        if (password !== confirmPassword) {
            alert('Mật khẩu chưa trùng khớp');
        } else {
            const data = {
                fullName: userName,
                phoneNumber: phoneNumber,
                passWord: password,
                confirmPassWord: confirmPassword,
            };
            fetch(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data?._token) {
                        alert('Đăng ký thành công');
                        navigate('/Login');
                        console.log('Success:', data);
                    } else {
                        if (data.error.statusCode === 403) {
                            throw new Error('Số điện thoại đã tồn tại!');
                        }
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img className={cx('logo-image')} src={images.logo} alt="" />
            </div>
            <div className={cx('login-title')}>
                <h1>Đăng Ký</h1>
            </div>

            <div className={cx('register-form')}>
                <form onSubmit={handleSubmitForm}>
                    <div className={cx('form-phoneNumber')}>
                        <PhoneIphone className={cx('item')} />
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-user')}>
                        <Person className={cx('item')} />
                        <input
                            type="text"
                            placeholder="Tên người dùng"
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('item')} />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('item')} />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            name="enterPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-button')}>
                        <button type="submit" variant="contained" color="primary">
                            ĐĂNG KÝ
                        </button>
                        <div id="tam"></div>
                    </div>
                    <div className={cx('form-back')}>
                        <ArrowLeft className={cx('item-back')} />
                        <Link to="/Login" className={cx('back')}>
                            Quay lại
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;
