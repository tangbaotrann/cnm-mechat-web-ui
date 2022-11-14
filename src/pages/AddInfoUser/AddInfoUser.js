// lib
import classNames from 'classnames/bind';
import { Radio } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//me
import styles from './AddInfoUser.module.scss';
import images from '~/assets/images';
import moment from 'moment';
import { updateAvatar, userUpdate } from '~/redux/features/user/updateUserSlice';
import { fetchApiUser } from '~/redux/features/user/userSlice';
import { userInfoSelector } from '~/redux/selector';

const cx = classNames.bind(styles);

function AddInfoUser() {
    const [fullNamee, setFullNamee] = useState(infoUser?.fullName);
    const [optionSex, setOptionSex] = useState(infoUser?.gender);
    const [birthday, setBirthday] = useState(moment(infoUser?.birthday).format('YYYY-MM-DD'));
    const [avatar, setAvatar] = useState(infoUser?.avatarLink);

    const infoUser = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchApiUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.previews);
        };
    }, [avatar]);

    const handleChangeFullName = (e) => {
        setFullNamee(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            fullName: fullNamee,
            gender: optionSex,
            birthday: birthday,
            idUser: infoUser._id,
        };
        dispatch(userUpdate(data));
        dispatch(
            updateAvatar({
                _id: infoUser._id,
                avatarLink: avatar,
            }),
        );
        if (userUpdate() || updateAvatar()) {
            navigate('/me.chat');
            console.log('ok');
        }
    };

    const handleChange1 = (e) => {
        setBirthday(e.target.value);
    };

    const handleChange = (e) => {
        const sex = e.target.value;
        if (sex === 'male') {
            setOptionSex(0);
        } else {
            setOptionSex(1);
        }
    };

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        file.previews = URL.createObjectURL(file);
        setAvatar(file);
        console.log(file);
    };

    const handlecancel = () => {
        navigate('/me.chat');
    };

    return (
        <div className={cx('body-info')}>
            <div className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-image')} src={images.logo} alt="" />
                </div>
                <div className={cx('login-title')}>
                    <h1>Thông tin cái nhân</h1>
                </div>

                <div className={cx('info-form')}>
                    <div className={cx('info-acc')}>
                        <div className={cx('sub-info-image')}>
                            <img className={cx('img-cover')} src={images.noImg} alt="" />
                            <img
                                className={cx('sub-img-avatar')}
                                src={avatar?.previews ? avatar?.previews : avatar}
                                alt=""
                            />
                            {/* Option change avatar update */}
                            <label htmlFor="file-info-users" className={cx('option-avatar')}>
                                <FontAwesomeIcon className={cx('icon-camera')} icon={faCamera} />
                                <input
                                    className={cx('hide')}
                                    type="file"
                                    id="file-info-users"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={handleChangeAvatar}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={cx('model-sub-info-acc-body')}>
                        <div className={cx('model-sub-info-acc')}>
                            <span className={cx('sub-title-desc')}>Tên hiển thị:</span>
                            <input
                                className={cx('sub-input-info-acc')}
                                type="text"
                                value={fullNamee}
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
                                        <Radio
                                            checked={optionSex === 0}
                                            onChange={handleChange}
                                            value="male"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': '0' }}
                                        />
                                        <div className={cx('gender')}>Nam</div>
                                    </div>
                                    <div className={cx('radio-option')}>
                                        <Radio
                                            checked={optionSex === 1}
                                            onChange={handleChange}
                                            value="female"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': '1' }}
                                        />
                                        <div className={cx('gender')}>Nữ</div>
                                    </div>
                                </div>
                            </div>
                            {/* Date of birthday */}

                            <div className={cx('sub-title-birthday')}>
                                <span className={cx('sub-title-desc')}>Ngày sinh: </span>
                                <input
                                    className={cx('sub-input-info-acc')}
                                    type="date"
                                    name="requested_order_ship_date"
                                    value={birthday}
                                    onChange={handleChange1}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('model-update-info-acc-footer')}>
                        <button className={cx('footer-sub-close-btn')} onClick={handlecancel}>
                            Bỏ qua
                        </button>
                        <button className={cx('footer-sub-update-btn')} onClick={handleSubmit}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddInfoUser;
