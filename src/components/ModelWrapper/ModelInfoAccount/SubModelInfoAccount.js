// libs
import classNames from 'classnames/bind';
import { useState } from 'react';
// import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPenToSquare, faCamera } from '@fortawesome/free-solid-svg-icons';

// me
import styles from './ModelInfoAccount.module.scss';
import images from '~/assets/images';
import ModelWrapper from '../ModelWrapper';

const cx = classNames.bind(styles);

function SubModelInfoAccount({ user }) {
    const [openUpdateInfoAccount, setOpenUpdateInfoAccount] = useState(false);
    const [fullName, setFullName] = useState('');

    // Handle open/ close model update info account
    const handleModelOpenUpdateInfoAccount = () => {
        setOpenUpdateInfoAccount(true);
    };
    const handleModelCloseUpdateInfoAccount = () => {
        setOpenUpdateInfoAccount(false);
    };

    // Handle change input full name
    const handleChangeFullName = (e) => {
        setFullName(e.target.value);
    };

    return (
        <>
            <button className={cx('footer-update-btn')} onClick={handleModelOpenUpdateInfoAccount}>
                <FontAwesomeIcon className={cx('footer-update-ic')} icon={faPenToSquare} />
                Cập nhật thông tin
            </button>
            {/* Show model update info account */}
            <ModelWrapper
                className={cx('model-update-info-acc')}
                open={openUpdateInfoAccount}
                onClose={handleModelCloseUpdateInfoAccount}
            >
                <div className={cx('model-info-acc-bg')}>
                    <div className={cx('model-info-acc-header')}>
                        <div className={cx('info-acc-title')}>
                            <span className={cx('acc-title')}>Cập nhật thông tin</span>
                            <button className={cx('close-btn')}>
                                <FontAwesomeIcon
                                    className={cx('acc-close-ic')}
                                    icon={faXmark}
                                    onClick={handleModelCloseUpdateInfoAccount}
                                />
                            </button>
                        </div>
                        <div className={cx('info-acc')}>
                            <div className={cx('sub-info-image')}>
                                <img
                                    className={cx('img-cover')}
                                    src={user?.backgroundLink ? user?.backgroundLink : images.noImg}
                                    alt=""
                                />
                                <img
                                    className={cx('sub-img-avatar')}
                                    src={user?.avatarLink ? user?.avatarLink : images.noImg}
                                    alt=""
                                />

                                {/* Option change avatar update */}
                                <label htmlFor="file" className={cx('option-avatar')}>
                                    <FontAwesomeIcon className={cx('icon-camera')} icon={faCamera} />
                                    <input className={cx('hide')} type="file" id="file" accept=".png, .jpg, .jpeg" />
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* render (map) after */}
                    <div className={cx('model-sub-info-acc-body')}>
                        <div className={cx('model-sub-info-acc')}>
                            <span className={cx('sub-title-desc')}>Tên hiển thị: </span>
                            <input
                                className={cx('sub-input-info-acc')}
                                type="text"
                                value={fullName}
                                onChange={handleChangeFullName}
                            />
                            <span className={cx('sub-desc')}>Sử dụng tên thật để bạn bè dễ dàng nhận diện hơn.</span>
                        </div>

                        <div className={cx('separator')}></div>

                        <div className={cx('model-sub-info-acc')}>
                            <p className={cx('sub-title-info')}>Thông tin cá nhân</p>
                            {/* Gender */}
                            <div className={cx('sub-title-gender')}>
                                <span className={cx('sub-title-desc')}>Giới tính: </span>
                                <div className={cx('gender-radio')}>
                                    <div className={cx('radio-option')}>
                                        <input type="radio" name="male" defaultChecked={true} />
                                        <div className={cx('gender')}>Nam</div>
                                    </div>
                                    <div className={cx('radio-option')}>
                                        <input type="radio" name="female" />
                                        <div className={cx('gender')}>Nữ</div>
                                    </div>
                                </div>
                            </div>
                            {/* Date of birthday */}
                            <div className={cx('sub-title-birthday')}>
                                <span className={cx('sub-title-desc')}>Ngày sinh: </span>
                                <input className={cx('sub-input-info-acc')} type="date" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('model-update-info-acc-footer')}>
                        <button className={cx('footer-sub-close-btn')}>Hủy</button>
                        <button className={cx('footer-sub-update-btn')}>Cập nhật</button>
                    </div>
                </div>
            </ModelWrapper>
        </>
    );
}

export default SubModelInfoAccount;
