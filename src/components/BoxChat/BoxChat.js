import classNames from 'classnames/bind';

// me
import styles from './Boxchat.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function BoxChat()
{
    return(
        <div className={cx('list-boxchat')}>
            <img className={cx('avatar-img')} src={images.tuan} alt="avatar" />   
            <div className={cx('box-name')}>
                     <h1>CNM</h1>                  
            </div>
            <div className={cx('box-number')}>
                     <h1>5 thành viên</h1>                  
            </div>
    
        </div>
    );
}
export default BoxChat;