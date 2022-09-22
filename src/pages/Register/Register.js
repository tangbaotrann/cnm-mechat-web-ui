//lib
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIphone, Lock, Person, ArrowLeft } from '@material-ui/icons';
import classNames from 'classnames/bind';
//me
import styles from './Register.module.scss';
import images from '~/assets/images';
import { authentication } from '~/util/firebase';
import {RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";


const cx = classNames.bind(styles);

function Register() {
    useEffect(() => {
        document.title = 'Trang đăng ký';
    });
    const countryCode="+84"
    const [phoneNumber,setPhoneNumber] = useState(countryCode);
    const [changeForm,setchangeForm] = useState(false);
    const [OTP,setOTP] = useState('');
    const generateRecaptcha= ()=>{
        window.recaptchaVerifier = new RecaptchaVerifier('tam', {
          'size': 'invisible',
          'callback': (response) => {
          }
        }, authentication);
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log("da click");
        console.log(phoneNumber+"ngoai if")
        if(phoneNumber.length>=10)
        {
      //  setchangeForm(true);
        console.log(phoneNumber+"trong if")
        generateRecaptcha();
        let appVerifier=window.recaptchaVerifier;
        signInWithPhoneNumber(authentication,phoneNumber,appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            setchangeForm(true);
            console.log("da gui");
        }).catch((err)=>{
            console.log(err);
        }) 
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
                <h1>Đăng Ký</h1>
            </div>
            </> : 
            <div className={cx('login-title')}>
                <h1>Xác nhận mã OTP</h1>
            </div>}
            {changeForm ===false ? 
                <>
            <div className={cx('register-form')}>
    
                <form onSubmit={handleSubmitForm}>
                    <div className={cx('form-phoneNumber')}>
                        <PhoneIphone className={cx('item')} />
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={e=>setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-user')}>
                        <Person className={cx('item')} />
                        <input type="text" placeholder="Tên người dùng" name="userName" />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('item')} />
                        <input type="password" placeholder="Mật khẩu" name="password"  />
                    </div>
                    <div className={cx('form-password')}>
                        <Lock className={cx('item')} />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            name="enterPassword"
                        />
                    </div>
                   
                    <div className={cx('form-button')}>
                            <button type="submit" variant="contained" color="primary" >
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
            </>
                :
                null}
            {changeForm ===true ? 
             <>  
                <div className={cx('login-form')}>
                    <form  onSubmit={handleconfirm}> 
                        <div className={cx('form-otp')}>    
                        <input  
                        type="tel"  
                        placeholder='Nhập mã OTP'
                        value={OTP}
                        onChange={e=>setOTP(e.target.value)}
                        name="otp"
                        />
                </div>    
                        <div className={cx('form-buttonotp')}>
                        <h5 className={cx('form-resend-code')}>Gửi lại mã</h5>
                            <button type="submit" variant="contained" color="primary">Xác nhận</button>
                        </div>
                        <div className={cx('form-back')}>
                        <ArrowLeft className={cx('item')}/> <Link to="/Register" className={cx('back')}>Quay lại</Link>
                         </div> 
                    </form>

                </div> 
            </>:null}
                </div>    
    );
}
export default Register;
