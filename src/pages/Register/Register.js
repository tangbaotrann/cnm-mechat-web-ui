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
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/components/hooks/useDebounce';
import filterSlice from '~/redux/features/filter/filterSlice';
import { accountExists } from '~/redux/selector';

const cx = classNames.bind(styles);

function Register() {
    useEffect(() => {
        document.title = 'Trang đăng ký';
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const debouncedValue = useDebounce(phoneNumber, 500);
    const searchAccountExists = useSelector(accountExists);

    // bat loi
    // const [check, setCheck] = useState(false);
    const [errorUserName, setErrorUserName] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    useEffect(() => {
        dispatch(filterSlice.actions.searchFilterChange(phoneNumber));
    }, [debouncedValue]);

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
        // var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (userName === '' && phoneNumber === '' && password === '' && confirmPassword === '') {
            setErrorUserName('Vui lòng nhập đầy đủ thông tin');
            setErrorPhoneNumber('Vui lòng nhập đầy đủ thông tin');
            setErrorPassword('Vui lòng nhập đầy đủ thông tin');
            setErrorConfirmPassword('Vui lòng nhập đầy đủ thông tin');
        } else if (userName === '') {
            setErrorUserName('Vui lòng nhập họ tên');
        } else if (phoneNumber === '') {
            setErrorPhoneNumber('Vui lòng nhập số điện thoại');
        } else if (password === '') {
            setErrorPassword('Vui lòng nhập mật khẩu');
        } else if (confirmPassword === '') {
            setErrorConfirmPassword('Vui lòng nhập xác nhận mật khẩu');
        } else if (password !== confirmPassword) {
            setErrorConfirmPassword('Mật khẩu không trùng khớp');
        } else {
            generateRecaptcha();
            const phoneNumbers = '+84' + phoneNumber.slice(1);
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumbers, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).

                    window.confirmationResult = confirmationResult;

                    // ...
                    navigate('/ConFirmOTP', { state: { userName, phoneNumber, password } });
                })
                .catch((error) => {
                    // Error; SMS not sent
                    // ...
                    //alert('Tài khoản đã yêu cầu quá nhiều lần!!!');
                    console.log('Chưa gửi về OTP' + error);
                });
        }
    };

    // bat loi
    useEffect(() => {
        var number = /^[0-9]{10}$/;
        var phoneNumberForm = /^(09|03|07|08|05)\d{4}\d{4}$/;
        if (phoneNumber.length === 10) {
            if (!number.test(phoneNumber)) {
                setErrorPhoneNumber('Số điện thoại phải là số và đủ 10 số');
            } else if (!phoneNumberForm.test(phoneNumber)) {
                setErrorPhoneNumber('Số điện thoại không đúng');
            } else if (searchAccountExists !== 1) {
                setErrorPhoneNumber('Số điện thoại đã được đăng ký');
            } else {
                setErrorPhoneNumber('');
            }
        }
    }, [phoneNumber]);
    useEffect(() => {
        var mk = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (password.length > 5) {
            if (!mk.test(password)) {
                setErrorPassword('Mật khẩu phải lớn 8 ký tự 1 ký tự viết hoa, 1 ký tự viết thường và số');
            } else {
                setErrorPassword('');
            }
        }
    }, [password]);
    useEffect(() => {
        if (userName.length > 0) {
            setErrorUserName('');
        }
        if (confirmPassword.length > 0) {
            setErrorConfirmPassword('');
        }
    }, [confirmPassword, userName]);
    return (
        <div className={cx('body-register')}>
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
                                type="text"
                                placeholder="Số điện thoại"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {/* {check === true ? <Check className={cx('item-check')} /> : null} */}
                        </div>
                        <span className={cx('error')}>{errorPhoneNumber}</span>
                        <div className={cx('form-user')}>
                            <Person className={cx('item')} />
                            <input
                                type="text"
                                placeholder="Tên người dùng"
                                name="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            {/* <Check className={cx('item-check')} /> */}
                        </div>
                        <span className={cx('error')}>{errorUserName}</span>
                        <div className={cx('form-password')}>
                            <Lock className={cx('item')} />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <Check className={cx('item-check')} /> */}
                        </div>
                        <span className={cx('error')}>
                            <p>{errorPassword}</p>
                        </span>
                        <div className={cx('form-password')}>
                            <Lock className={cx('item')} />
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                name="enterPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {/* <Check className={cx('item-check')} /> */}
                        </div>
                        <span className={cx('error')}>{errorConfirmPassword}</span>
                        <div className={cx('form-button')}>
                            <button type="submit" variant="contained" color="primary">
                                ĐĂNG KÝ
                            </button>
                            <div id="tam"></div>
                        </div>
                        <div className={cx('form-back')}>
                            <ArrowLeft className={cx('item-back')} />
                            <Link to="/" className={cx('back')}>
                                Quay lại
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;
