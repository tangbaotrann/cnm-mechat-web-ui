// libs
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUser } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './ModelInfoAccount.module.scss';
import images from '~/assets/images';
import ModelWrapper from '~/components/ModelWrapper';
import SubModelInfoAccount from './SubModelInfoAccount';

const cx = classNames.bind(styles);

function ModelInfoAccount({ yourProfile }) {
    const [openInfoAccount, setOpenInfoAccount] = useState(false);

    // Handle open/ close model info account
    const handleModelOpenInfoAccount = () => {
        setOpenInfoAccount(true);
    };
    const handleModelCloseInfoAccount = () => {
        setOpenInfoAccount(false);
    };

    return (
        <>
            {yourProfile ? (
                <button className={cx('item-btn')} onClick={handleModelOpenInfoAccount}>
                    Hồ sơ của bạn
                </button>
            ) : (
                <>
                    <FontAwesomeIcon className={cx('setting-icon')} icon={faUser} />
                    <button className={cx('setting-item-btn')} onClick={handleModelOpenInfoAccount}>
                        Thông tin tài khoản
                    </button>
                </>
            )}
            <ModelWrapper className={cx('model-info-acc')} open={openInfoAccount} onClose={handleModelCloseInfoAccount}>
                <div className={cx('model-info-acc-bg')}>
                    <div className={cx('model-info-acc-header')}>
                        <div className={cx('info-acc-title')}>
                            <span className={cx('acc-title')}>Thông tin tài khoản</span>
                            <button className={cx('close-btn')}>
                                <FontAwesomeIcon
                                    className={cx('acc-close-ic')}
                                    icon={faXmark}
                                    onClick={handleModelCloseInfoAccount}
                                />
                            </button>
                        </div>
                        <div className={cx('info-acc')}>
                            <div className={cx('info-image')}>
                                <img className={cx('img-cover')} src={images.noImg} alt="" />
                                <img className={cx('img-avatar')} src={images.avt} alt="" />
                            </div>
                            <div className={cx('info-name')}>
                                <div className={cx('name')}>Tăng Bảo Trấnn</div>
                            </div>
                        </div>
                    </div>
                    {/* render (map) after */}
                    <div className={cx('model-info-acc-body')}>
                        <div className={cx('info-desc-title')}>Thông tin cá nhân</div>
                        <div className={cx('info-desc-line')}>
                            <div className={cx('info-title')}>Điện thoại: </div>
                            <div>+84325676569</div>
                        </div>
                        <div className={cx('info-desc-line')}>
                            <div className={cx('info-title')}>Giới tính: </div>
                            <div>Nam</div>
                        </div>
                        <div className={cx('info-desc-line')}>
                            <div className={cx('info-title')}>Ngày sinh: </div>
                            <div>24 tháng 10, 2001</div>
                        </div>
                    </div>
                    <div className={cx('model-info-acc-footer')}>
                        {/* model update info account */}
                        <SubModelInfoAccount />
                    </div>
                </div>
            </ModelWrapper>
        </>
    );
}

export default ModelInfoAccount;
