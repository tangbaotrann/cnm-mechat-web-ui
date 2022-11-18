// lib
import classNames from 'classnames/bind';
import { useState } from 'react';

// me
import styles from './Report.module.scss';
import images from '~/assets/images';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Report() {
    const [newImageMessage, setNewImageMessage] = useState([]);
    const [btnClosePreview, setBtnClosePreview] = useState(false);

    // handle change image and preview image
    const handleChangeImageMessage = (e) => {
        const files = e.target.files;
        const listImg = [];

        [...files].forEach((file) => {
            listImg.push({
                data: file,
                preview: URL.createObjectURL(file),
            });
        });

        setNewImageMessage(listImg);
        setBtnClosePreview(!btnClosePreview);
    };

    // handle close preview image
    const handleClosePreview = () => {
        setNewImageMessage([]);
        setBtnClosePreview(false);
    };

    // handle confirm report
    const handleConfirmReport = () => {};

    return (
        <div className={cx('model-report')}>
            <div className={cx('model-report-header')}>
                <h1 className={cx('model-report-header-name')}>Báo cáo hành vi</h1>
                <img className={cx('model-report-header-img')} src={images.logo} alt="logo-mechat" />
            </div>

            <div className={cx('model-report-body')}>
                {/* option image */}
                <label htmlFor="file-report">
                    <div className={cx('option-image-icon')}>
                        <Tippy className={cx('tool-tip')} content="Chọn hình ảnh bạn muốn báo cáo" delay={[200, 0]}>
                            <FontAwesomeIcon className={cx('option-icon')} icon={faImage} />
                        </Tippy>
                        <input
                            className={cx('hide')}
                            type="file"
                            id="file-report"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleChangeImageMessage}
                            multiple
                        />
                    </div>
                </label>

                <textarea className={cx('message-input')} placeholder="Nhập nội dung báo cáo của bạn..."></textarea>

                {/* Button close preview */}
                {btnClosePreview && (
                    <button className={cx('close-btn')} onClick={handleClosePreview}>
                        <FontAwesomeIcon icon={faClose} className={cx('close-icon')} />
                    </button>
                )}
                {/* Show preview image of report */}
                {newImageMessage.length > 0 ? (
                    <div>
                        {newImageMessage.map((img, index) => {
                            return (
                                <img className={cx('image-upload')} key={index} src={img.preview} alt="img-report" />
                            );
                        })}
                    </div>
                ) : null}
            </div>

            <div className={cx('model-report-footer')}>
                <button className={cx('btn-report')} onClick={handleConfirmReport}>
                    Gửi
                </button>
            </div>
        </div>
    );
}

export default Report;
