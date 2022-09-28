import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

import { useState, useEffect } from 'react';
import { PhoneIphone, Lock ,ArrowLeft} from '@material-ui/icons';
import {  Link } from 'react-router-dom';
import { authentication } from '~/util/firebase';
import {RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
const cx = classNames.bind(styles);
function Login() {
    useEffect(() => {
        document.title = 'Trang đăng nhập';
    });
    const countryCode="+84"
    const [phoneNumber,setPhoneNumber] = useState(countryCode);
    const [OTP,setOTP] = useState('');
    const [changeForm,setchangeForm] = useState(false);
    const generateRecaptcha= ()=>{
        window.recaptchaVerifier = new RecaptchaVerifier('tam', {
          'size': 'invisible',
          'callback': (response) => {
          }
        }, authentication);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("da click");
        console.log(phoneNumber+"ngoai if")
        if(phoneNumber.length>=10)
        {
      //  setchangeForm(true);
        console.log(phoneNumber+"trong if")
        generateRecaptcha();
        const appVerifier=window.recaptchaVerifier;
        signInWithPhoneNumber( authentication,phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("ĐÃ gửi OTP");
          setchangeForm(true);
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          alert("Số điện thoại chưa đăng ký tài khoảng")
          console.log("Chưa gửi về OTP"+error);
        });
        }
    };
    const handleconfirm = (e)=>
    {
        if(OTP.length===6)
        {
          let confirmationResult =  window.confirmationResult;
          confirmationResult.confirm(OTP).then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
            console.log("hoan thanh")
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img className={cx('logo-image')} src={images.logo} alt="" />
            </div>

            {changeForm ===false ? 
                <>
            <div className={cx('login-title')}>
                <h1>Đăng Nhập</h1>
            </div>
            </> : 
            <div className={cx('login-title')}>
                <h1>Xác nhận mã OTP</h1>
            </div>}
            {changeForm ===false ? 
                <>
            <div className={cx('login-form')}>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-phoneNumber')}>
                        <PhoneIphone className={cx('item')} />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={e=>setPhoneNumber(e.target.value)}
                            
                        />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('password-item')} />
                        <input 
                            type="password" 
                            placeholder="Mật khẩu" 
                            name="password"  
                        />
                    </div>
                    <div className={cx('form-button')}>
                       
                            <button type="submit" variant="contained" color="primary">
                                ĐĂNG NHẬP
                            </button>
                            <div id="tam"></div>
                         <Link to="/Home" ></Link>
                    </div>
                    <div className={cx('form-forget')}>
                        <a href="/forgotpassword">Quên mật khẩu?</a>
                    </div>
                </form>
            </div>
            <div className={cx('form-register')}>
                <h1>
                    <a>Bạn chưa có tài khoản?</a>
                    <Link to="/Register" className={cx('form-register-register')}>
                        Đăng ký ngay
                    </Link>
                </h1>
            </div>
            </>
                :
                null}
            {changeForm ===true ? 
             <>  
                <div className={cx('login-form1')}>
                    <form  onSubmit={handleconfirm}> 
                        <div className={cx('form-otp1')}>    
                        <input  
                        type="tel"  
                        placeholder='Nhập mã OTP'
                        value={OTP}
                        onChange={e=>setOTP(e.target.value)}
                        name="otp"
                        />
                </div>    
                        <div className={cx('form-buttonotp1')}>
                        <h5 className={cx('form-resend-code1')}>Gửi lại mã</h5>
                            <button type="submit" variant="contained" color="primary">Xác nhận</button>
                        </div>
                        <div className={cx('form-back1')}>
                        <ArrowLeft className={cx('item')}/> <Link to="/Login" className={cx('back')}>Quay lại</Link>
                         </div> 
                    </form>

                </div> 
            </>:null}
        </div>
    );
}
export default Login;
