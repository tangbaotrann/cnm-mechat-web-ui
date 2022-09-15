import styles from './ConfirmOTP.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link } from "react-router-dom";
import {ArrowLeft} from '@material-ui/icons';
const cx = classNames.bind(styles);
function ConfirmOTP()
{
    return (
        <body>
        <div className={cx('wrapper')}>
             <div className={cx('logo')}>
                <img className={cx('logo-image')} src={images.logo} alt="" />
            </div>
            <div className={cx('login-title')}>
                <h1>Xác nhận mã OTP
                </h1>
            </div>
            <div className={cx('login-form')}>
            <form action="" >
                <div className={cx('form-otp')}>
                     <input className={cx('otp')} type="text"  maxlength='1' />
                    <input className={cx('otp')} type="text"  maxlength='1' />
                    <input className={cx('otp')} type="text"  maxlength='1' />
                     <input className={cx('otp')} type="text"  maxlength='1' />
              </div>
              <div className={cx('form-button')}>
                <h5 className={cx('form-resend-code')}>Gửi lại mã</h5>
                            <button>Xác nhận</button>
            </div>
                 <div className={cx('form-back')}>
                    <ArrowLeft className={cx('item')}/> <Link to="/login" className={cx('back')}>Quay lại</Link>
                            </div> 
                </form>

            </div> 
        </div>
    </body>
    );
}
export default ConfirmOTP