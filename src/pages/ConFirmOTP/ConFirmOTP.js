import styles from './ConFirmOTP.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { ArrowLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authentication } from '~/util/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const cx = classNames.bind(styles);
function ConFirmOTP() {
    const [OTP, setOTP] = useState('');
    const navigate = useNavigate();
    const [counter, setCounter] = useState(60);
    const location = useLocation();
    //dữ liệu truyền
    const tokenS = location.state.token;
    const phoneNumber = location.state.phoneNumber;
    // const userName = location.state.userName;
    // const password = location.state.password;

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
    }, [counter]);

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
    const handleConfirm = async (e) => {
        e.preventDefault();
        // console.log('da click');
        // console.log('ngoai if');
        if (counter !== 0) {
            if (OTP.length === 6) {
                console.log('trong if');
                generateRecaptcha();
                if (OTP.length === 6) {
                    let confirmationResult = window.confirmationResult;
                    confirmationResult
                        .confirm(OTP)
                        .then((result) => {
                            // User signed in successfully.
                            // ...

                            // register().then((token) => {
                            //     console.log(token);
                            //     if (token !== null) {
                            //         alert('Đăng ký thành công');
                            //         console.log('hoan thanh');
                            //         localStorage.setItem('user_login', JSON.stringify(token));
                            //         // navigate('/me.chat');
                            //     }
                            // });

                            //  else {
                            console.log('hoan thanh');
                            localStorage.setItem('user_login', JSON.stringify(tokenS));
                            navigate('/me.chat');
                            // }
                        })
                        .catch((error) => {
                            // User couldn't sign in (bad verification code?)
                            // ...
                            console.log(error);
                            alert('Mã OTP sai');
                        });
                }
            }
        } else {
            alert('Hết thời gian xác thực');
        }
    };
    //lấy capcha
    const handleCallBackCode = () => {
        setCounter(30);
        console.log(phoneNumber);
        if (phoneNumber.length > 0) {
            generateRecaptcha();
            const phoneNumbers = '+84' + phoneNumber.slice(1);
            console.log(phoneNumber + 'sao khi +84');
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumbers, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    console.log('ĐÃ gửi OTP');
                    // ...
                })
                .catch((error) => {
                    // Error; SMS not sent
                    // ...
                    console.log(error);
                    alert('Chưa gửi về OTP');
                    // console.log('Chưa gửi về OTP' + error);
                });
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
                <form onSubmit={handleConfirm}>
                    <div className={cx('form-otp')}>
                        <input
                            type="tel"
                            placeholder="Nhập mã OTP"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            name="otp"
                        />
                        <p>{counter}</p>
                    </div>
                    <div className={cx('form-button-otp')}>
                        <h5 className={cx('form-resend-code')} onClick={handleCallBackCode}>
                            Gửi lại mã
                        </h5>
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
