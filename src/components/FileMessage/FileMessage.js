// lib
import classNames from 'classnames/bind';

// me
import images from '~/assets/images';
import styles from './FileMessage.module.scss';

const cx = classNames.bind(styles);

function FileMessage({ newFileMessage }) {
    const icons = ['docx', 'ppt', 'pdf', 'xlsx'];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('files')}>
                <img className={cx('img-icon')} src={images.noImg} alt="icon-file" />
                <p className={cx('name-file')}>{newFileMessage.name}</p>
            </div>
        </div>
    );
}

export default FileMessage;
