import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link } from "react-router-dom";
 import {PhoneIphone, Lock,Person,ArrowLeft} from '@material-ui/icons';
 import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Register()
{
    useEffect(() => {
        document.title = "Trang đăng ký";
      });
      // //config
      // const configureCaptcha = () => {
      //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      //     "sign-in-button",
      //     {
      //       size: "invisible",
      //       callback: (response) => {
      //        // handleSendSms();
      //       },
      //       defaultCountry: "IN",
      //     }
      //   );
      // };
    const handleChangeInput = (e) => {
        const {name,value} = e.target;
        console.log({[name]:value})
      };
    const handleSubmitForm = (e) =>{

    };

      
    return(     
            <div className={cx('wrapper')}>
                 <div className={cx('logo')}>
                    <img className={cx('logo-image')} src={images.logo} alt="" />
                </div>
                                <div className={cx('login-title')}>
                    <h1>Đăng Ký
                    </h1>
                </div> 
                <div className={cx('register-form')}>
                       <form onSubmit={handleSubmitForm} >
                            <div className={cx('form-phoneNumber')}>                                                  
                            <PhoneIphone className={cx('item')}/>
                            <input 
                                type="text"
                                placeholder='Số điện thoại'
                                name="phoneNumber"
                                onChange={handleChangeInput}
                            />                           
                            </div> 
                            <div className={cx('form-user')}>                                                  
                            <Person className={cx('item')}/>
                            <input 
                                type="text" 
                                placeholder='Tên người dùng'  
                                name="userName"
                                onChange={handleChangeInput}
                            />                           
                            </div> 
                            <div className={cx('form-password')}>
                             <Lock className={cx('item')}/>
                             <input 
                                type="password" 
                                placeholder='Mật khẩu'  
                                name="password"
                                onChange={handleChangeInput}
                             />  
                            </div>
                            <div className={cx('form-password')}>
                             <Lock className={cx('item')}/>
                             <input 
                                type="password" 
                                placeholder='Nhập lại mật khẩu'  
                                name="enterPassword"
                                onChange={handleChangeInput}
                            />  
                            </div>
                            <div className={cx('form-button')}>
                            <Link to='/ConfirmOTP'><button type="submit" variant="contained" color="primary">ĐĂNG KÝ</button></Link>
                            </div>
                            <div className={cx('form-back')}>
                            <ArrowLeft className={cx('item-back')}/><Link to="/" className={cx('back')}>Quay lại</Link>
                            </div>    
                        </form> 
                       
                </div>
       
            </div>

    );
}
export default Register
