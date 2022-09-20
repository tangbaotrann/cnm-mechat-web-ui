import styles from './ConfirmOTP.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link } from "react-router-dom";
import {ArrowLeft} from '@material-ui/icons';
const cx = classNames.bind(styles);
function ConfirmOTP()
{
    return (

        <div className={cx('wrapper')}>
             <div className={cx('logo')}>
                <img className={cx('logo-image')} src={images.logo} alt="" />
            </div>
            <div className={cx('login-title')}>
                <h1>Xác nhận mã OTP
                </h1>
            </div>
            <div className={cx('login-form')}>
            <form  > 
            <div className={cx('form-otp')}>    
                     <input  type="text"  placeholder='Nhập mã OTP'/>
                     </div>    
              <div className={cx('form-button')}>
                <h5 className={cx('form-resend-code')}>Gửi lại mã</h5>
                         <Link to='/'> <button>Xác nhận</button></Link>
            </div>
                 <div className={cx('form-back')}>
                    <ArrowLeft className={cx('item')}/> <Link to="/Register" className={cx('back')}>Quay lại</Link>
                            </div> 
                </form>

            </div> 
        </div>

    );
}
export default ConfirmOTP