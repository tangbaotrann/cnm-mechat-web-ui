import styles from './ForgetPassWord.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneIphone, Lock, ArrowLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { accountExists } from '~/redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/components/hooks/useDebounce';
import filterSlice from '~/redux/features/filter/filterSlice';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { authentication } from '~/util/firebase';
const cx = classNames.bind(styles);
function ForgetPassWord() {
    useEffect(() => {
        document.title = 'Trang quên mật khẩu';
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchAccountExists = useSelector(accountExists);
    const debouncedValue = useDebounce(phoneNumber, 500);
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
        var mk = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (password === '') {
            alert('Vui lòng nhập mật khẩu mới');
        } else if (!mk.test(password)) {
            alert('Mật khẩu phải lớn 8 ký tự trong đó 1 ký tự viết hoa, 1 ký tự viết thường và số');
        } else if (password !== confirmPassword) {
            alert('Mật khẩu không trùng khớp');
        } else {
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
                    navigate('/ConFirmOTP', { state: { phoneNumber, password } });
                })
                .catch((error) => {
                    // Error; SMS not sent
                    // ...
                    alert('Tài khoản đã yêu cầu quá nhiều lần!!!');
                    console.log('Chưa gửi về OTP' + error);
                });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        var phoneNumberForm = /^(09|03|07|08|05)\d{4}\d{4}$/;
        var number = /^[0-9]{10}$/;

        if (phoneNumber === '') {
            alert('Vui lòng nhập số điện thoại');
        } else if (!number.test(phoneNumber)) {
            alert('Số điện thoại phải là số và đủ 10 số');
        } else if (!phoneNumberForm.test(phoneNumber)) {
            alert('Số điện thoại Chưa không đúng');
        } else if (searchAccountExists !== 1) {
            setShow(true);
            console.log('27-----', phoneNumber);

            console.log('24-----  ton tai');
        } else {
            setShow(false);
            console.log('27-----', phoneNumber);
            alert('Tài khoản không tồn tại');
            console.log('24-----  không tồn tại');
        }
    };
    return (
        <body className={cx('body-forget')}>
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-image')} src={images.logo} alt="" />
                </div>
                <div className={cx('login-title')}>
                    <h1>Khôi phục mật khẩu</h1>
                </div>

                <div className={cx('forget-form')}>
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
                        </div>
                        {show === true ? (
                            <div className={cx('form-password')}>
                                <Lock className={cx('item')} />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        ) : null}
                        {show === true ? (
                            <div className={cx('form-password')}>
                                <Lock className={cx('item')} />
                                <input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu mới"
                                    name="enterPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        ) : null}
                        {show === true ? (
                            <div className={cx('form-button')}>
                                <button type="submit" variant="contained" color="primary">
                                    Xác nhận
                                </button>
                                <div id="tam"></div>
                            </div>
                        ) : (
                            <div className={cx('form-button')}>
                                <button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                    Kiểm tra
                                </button>
                                <div id="tam"></div>
                            </div>
                        )}
                        <div className={cx('form-back')}>
                            <ArrowLeft className={cx('item-back')} />
                            <Link to="/" className={cx('back')}>
                                Quay lại
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}
export default ForgetPassWord;
