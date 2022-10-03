//lib
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneIphone, Lock, Person, ArrowLeft } from '@material-ui/icons';
import classNames from 'classnames/bind';
//me
import styles from './Register.module.scss';
import images from '~/assets/images';
import { authentication } from '~/util/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const cx = classNames.bind(styles);

function Register() {
    useEffect(() => {
        document.title = 'Trang đăng ký';
    });
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');

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
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log('da click');
        console.log(phoneNumber + 'ngoai if');
        if (phoneNumber.length >= 10) {
            console.log(phoneNumber + 'trong if');
            generateRecaptcha();
            const phoneNumbers = '+84' + phoneNumber.slice(1);
            console.log(phoneNumbers + 'sao khi +84');
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumbers, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;

                    console.log('da gui');
                    navigate('/ConFirmOTP');
                })
                .catch((err) => {
                    alert('Số điện thoại đã đăng ký tài khoảng');
                    console.log(err);
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
                        <input type="text" placeholder="Tên người dùng" name="userName" />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('item')} />
                        <input type="password" placeholder="Mật khẩu" name="password" />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('item')} />
                        <input type="password" placeholder="Nhập lại mật khẩu" name="enterPassword" />
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
