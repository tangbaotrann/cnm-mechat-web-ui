import styles from './ConFirmOTP.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { ArrowLeft } from '@material-ui/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authentication } from '~/util/firebase';
import { RecaptchaVerifier } from 'firebase/auth';
const cx = classNames.bind(styles);
function ConFirmOTP() {
    const [OTP, setOTP] = useState('');
    const navigate = useNavigate();
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

    const handleconfirm = async (e) => {
        e.preventDefault();
        console.log('da click');
        console.log('ngoai if');
        if (OTP.length === 6) {
            //  setchangeForm(true);
            console.log('trong if');
            generateRecaptcha();
            //     const phoneNumbers = "+84" + phoneNumber.slice(1);
            //console.log(phoneNumbers + "sao khi +84")
            if (OTP.length === 6) {
                let confirmationResult = window.confirmationResult;
                confirmationResult
                    .confirm(OTP)
                    .then((result) => {
                        // User signed in successfully.
                        // ...
                        console.log('hoan thanh');
                        navigate('/me.chat');
                    })
                    .catch((error) => {
                        // User couldn't sign in (bad verification code?)
                        // ...
                        console.log(error);
                        alert('Số điện thoại chưa đăng ký tài khoảng');
                    });
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img className={cx('logo-image')} src={images.logo} alt="" />
            </div>
            <div className={cx('login-title')}>
                <h1>Xác nhận mã OTP</h1>
            </div>
            <div className={cx('otp-form')}>
                <form onSubmit={handleconfirm}>
                    <div className={cx('form-otp')}>
                        <input
                            type="tel"
                            placeholder="Nhập mã OTP"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            name="otp"
                        />
                    </div>
                    <div className={cx('form-buttonotp')}>
                        <h5 className={cx('form-resend-code')}>Gửi lại mã</h5>
                        <button type="submit" variant="contained" color="primary">
                            Xác nhận
                        </button>
                        <div id="tam"></div>
                    </div>
                    <div className={cx('form-back')}>
                        <ArrowLeft className={cx('item')} />{' '}
                        <Link to="/Login" className={cx('back')}>
                            Quay lại
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ConFirmOTP;
